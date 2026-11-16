import { describe, expect, it } from "vitest";
import type { HassEntity, PaletteColor, RoomConfig } from "../src/types/config";
import { translateLightCommand } from "../src/utils/color-translator";
import { buildRoomSceneEntities, slugifySceneId } from "../src/utils/ha-scenes";
import { resolveEntityVisualState } from "../src/utils/color";

const COLOR_CYAN: PaletteColor = {
  id: "cyan_mid",
  label: "Türkis",
  kind: "color",
  hex: "#22d3ee",
};

const WHITE_2700: PaletteColor = {
  id: "white_2700",
  label: "2700K Warm",
  kind: "white",
  hex: "#ffa957",
  kelvin: 2700,
};

const WHITE_5500: PaletteColor = {
  id: "white_5500",
  label: "5500K Tag",
  kind: "white",
  hex: "#fff7ed",
  kelvin: 5500,
};

const HUE_ENTITY: HassEntity = {
  entity_id: "light.wohnzimmer_bodenlampe_rechts",
  state: "off",
  attributes: {
    friendly_name: "Bodenlampe Rechts",
    supported_color_modes: ["color_temp", "xy"],
    min_color_temp_kelvin: 2000,
    max_color_temp_kelvin: 6535,
  },
};

const TUYA_ENTITY: HassEntity = {
  entity_id: "light.wohnzimmer_floor_lamp",
  state: "off",
  attributes: {
    friendly_name: "Stehlampe Links Hauptlicht",
    supported_color_modes: ["hs", "white"],
  },
};

const MQTT_CCT_ENTITY: HassEntity = {
  entity_id: "light.sideboard",
  state: "off",
  attributes: {
    friendly_name: "Sideboard",
    supported_color_modes: ["color_temp", "hs"],
    min_color_temp_kelvin: 2000,
    max_color_temp_kelvin: 6535,
  },
};

const DIMMER_ENTITY: HassEntity = {
  entity_id: "light.wandlampe_flur_1",
  state: "off",
  attributes: {
    friendly_name: "Wandlampe oben",
    supported_color_modes: ["brightness"],
  },
};

const RGB_ONLY_ENTITY: HassEntity = {
  entity_id: "light.schlafzimmer_ventilator_rgb_light",
  state: "off",
  attributes: {
    friendly_name: "Ventilator RGB",
    supported_color_modes: ["rgb"],
  },
};

describe("Color-Mode Translator across observed HA hardware profiles", () => {
  it("translates colors to xy_color for Hue and hs_color for Tuya/Z2M", () => {
    const hueCmd = translateLightCommand(HUE_ENTITY.entity_id, HUE_ENTITY, {
      action: "on",
      brightnessPct: 80,
      color: COLOR_CYAN,
    });
    const tuyaCmd = translateLightCommand(TUYA_ENTITY.entity_id, TUYA_ENTITY, {
      action: "on",
      brightnessPct: 80,
      color: COLOR_CYAN,
    });
    const mqttCmd = translateLightCommand(MQTT_CCT_ENTITY.entity_id, MQTT_CCT_ENTITY, {
      action: "on",
      brightnessPct: 80,
      color: COLOR_CYAN,
    });
    const rgbCmd = translateLightCommand(RGB_ONLY_ENTITY.entity_id, RGB_ONLY_ENTITY, {
      action: "on",
      brightnessPct: 80,
      color: COLOR_CYAN,
    });

    expect(hueCmd.scenePayload?.xy_color).toHaveLength(2);
    expect(tuyaCmd.scenePayload?.hs_color).toHaveLength(2);
    expect(mqttCmd.scenePayload?.hs_color).toHaveLength(2);
    expect(rgbCmd.scenePayload?.rgb_color).toEqual([34, 211, 238]);
  });

  it("uses color_temp_kelvin for color_temp lamps and warm hs_color for Tuya ['hs','white']", () => {
    const hueWarm = translateLightCommand(HUE_ENTITY.entity_id, HUE_ENTITY, {
      action: "on",
      brightnessPct: 75,
      color: WHITE_2700,
    });
    const tuyaWarm = translateLightCommand(TUYA_ENTITY.entity_id, TUYA_ENTITY, {
      action: "on",
      brightnessPct: 75,
      color: WHITE_2700,
    });
    const tuyaCool = translateLightCommand(TUYA_ENTITY.entity_id, TUYA_ENTITY, {
      action: "on",
      brightnessPct: 75,
      color: WHITE_5500,
    });

    expect(hueWarm.scenePayload?.color_temp_kelvin).toBe(2700);
    expect(tuyaWarm.scenePayload?.hs_color).toBeDefined();
    expect(tuyaWarm.preferNativeWhiteLive).toBeUndefined();
    expect(tuyaCool.preferNativeWhiteLive).toBe(true);
  });

  it("skips brightness-only dimmers when a color is selected, but dims on white tones", () => {
    const colorSkip = translateLightCommand(DIMMER_ENTITY.entity_id, DIMMER_ENTITY, {
      action: "on",
      brightnessPct: 60,
      color: COLOR_CYAN,
    });
    const whiteDim = translateLightCommand(DIMMER_ENTITY.entity_id, DIMMER_ENTITY, {
      action: "on",
      brightnessPct: 60,
      color: WHITE_2700,
    });

    expect(colorSkip.status).toBe("skipped_no_color");
    expect(whiteDim.status).toBe("applied");
    expect(whiteDim.scenePayload?.brightness).toBe(Math.round(0.6 * 255));
  });

  it("applies per-entity calibration offsets to hue, saturation, and brightness", () => {
    const cmd = translateLightCommand(
      TUYA_ENTITY.entity_id,
      TUYA_ENTITY,
      { action: "on", brightnessPct: 100, color: COLOR_CYAN },
      { hue_offset_deg: 15, saturation_scale: 0.5, brightness_scale: 0.8 },
    );
    const uncalibrated = translateLightCommand(TUYA_ENTITY.entity_id, TUYA_ENTITY, {
      action: "on",
      brightnessPct: 100,
      color: COLOR_CYAN,
    });

    expect(cmd.scenePayload?.brightness).toBe(204);
    expect(cmd.scenePayload?.hs_color?.[0]).not.toBe(uncalibrated.scenePayload?.hs_color?.[0]);
    expect(cmd.scenePayload?.hs_color?.[1]).toBeLessThan(
      uncalibrated.scenePayload?.hs_color?.[1] ?? 100,
    );
  });

  it("captures ALL room lights including explicit 'off' entries when building a scene", () => {
    const room: RoomConfig = {
      id: "wohnzimmer",
      name: "Wohnzimmer",
      height_m: 2.5,
      floor_polygon: [
        { x: 0, y: 0 },
        { x: 5, y: 0 },
        { x: 5, y: 4 },
        { x: 0, y: 4 },
      ],
      camera_pov: { position: [2.5, 3.5, 1.2], target: [2.5, 0.2, 1.0] },
      furniture: [],
      lights: [
        {
          entity_id: TUYA_ENTITY.entity_id,
          geometry: { type: "point", position: [1, 1, 1] },
        },
        {
          entity_id: HUE_ENTITY.entity_id,
          geometry: { type: "point", position: [4, 1, 1] },
        },
      ],
    };

    const visualStates = new Map([
      [TUYA_ENTITY.entity_id, resolveEntityVisualState(room.lights[0], TUYA_ENTITY)],
      [HUE_ENTITY.entity_id, resolveEntityVisualState(room.lights[1], HUE_ENTITY)],
    ]);
    const pending = new Map([
      [
        TUYA_ENTITY.entity_id,
        { state: "on" as const, brightness: 160, hs_color: [260, 75] as [number, number] },
      ],
    ]);

    const entities = buildRoomSceneEntities(room, undefined, pending, visualStates);
    expect(entities[TUYA_ENTITY.entity_id]).toEqual({
      state: "on",
      brightness: 160,
      hs_color: [260, 75],
    });
    expect(entities[HUE_ENTITY.entity_id]).toBe("off");
    expect(slugifySceneId("Wohnzimmer – Gemütlich")).toBe("wohnzimmer_gemuetlich");
  });
});
