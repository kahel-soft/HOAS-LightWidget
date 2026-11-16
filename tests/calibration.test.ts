import { describe, expect, it } from "vitest";
import {
  isNeutralCalibration,
  sanitizeCalibration,
} from "../src/components/calibration-wizard";
import type { HassEntity, PaletteColor } from "../src/types/config";
import { translateLightCommand } from "../src/utils/color-translator";
import { pushRecentColor, toggleFavoriteColor, WHITE_PALETTE } from "../src/utils/palette";

describe("Color Calibration Wizard & Palette Persistence", () => {
  it("treats neutral calibration values as empty/removable", () => {
    expect(isNeutralCalibration({})).toBe(true);
    expect(
      isNeutralCalibration({ hue_offset_deg: 0, saturation_scale: 1, brightness_scale: 1 }),
    ).toBe(true);
    expect(
      sanitizeCalibration({ hue_offset_deg: 0, saturation_scale: 1, brightness_scale: 1 }),
    ).toBeUndefined();
  });

  it("retains non-neutral calibration offsets cleanly", () => {
    expect(
      sanitizeCalibration({
        hue_offset_deg: -12,
        saturation_scale: 0.85,
        brightness_scale: 1,
        warm_white_hue_deg: 32,
        warm_white_saturation_pct: 48,
      }),
    ).toEqual({
      hue_offset_deg: -12,
      saturation_scale: 0.85,
      warm_white_hue_deg: 32,
      warm_white_saturation_pct: 48,
    });
  });

  it("applies warm-white HS calibration to Tuya ['hs','white'] lights", () => {
    const tuyaLamp: HassEntity = {
      entity_id: "light.wohnzimmer_floor_lamp",
      state: "off",
      attributes: {
        friendly_name: "Stehlampe Links Hauptlicht",
        supported_color_modes: ["hs", "white"],
      },
    };
    const warm2700: PaletteColor = WHITE_PALETTE[2];
    const cmd = translateLightCommand(
      tuyaLamp.entity_id,
      tuyaLamp,
      { action: "on", brightnessPct: 80, color: warm2700 },
      { warm_white_hue_deg: 32, warm_white_saturation_pct: 44, hue_offset_deg: 4 },
    );

    expect(cmd.status).toBe("applied");
    expect(cmd.scenePayload?.hs_color).toEqual([36, 44]);
  });

  it("updates recent colors and toggles favorites without duplicates", () => {
    const a: PaletteColor = { id: "c1", label: "C1", kind: "color", hex: "#ff0000" };
    const b: PaletteColor = { id: "c2", label: "C2", kind: "color", hex: "#00ff00" };

    const recent1 = pushRecentColor([a, b], b);
    expect(recent1.map((c) => c.id)).toEqual(["c2", "c1"]);

    const fav1 = toggleFavoriteColor([a], b);
    expect(fav1.map((c) => c.id)).toEqual(["c2", "c1"]);
    const fav2 = toggleFavoriteColor(fav1, a);
    expect(fav2.map((c) => c.id)).toEqual(["c2"]);
  });
});
