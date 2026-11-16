import type {
  EntityCalibration,
  HassEntity,
  LightColorMode,
  PaletteColor,
} from "../types/config";
import {
  hexToRgb,
  hsToRgb,
  kelvinToRgb,
  kelvinToWarmHs,
  rgbToHs,
  rgbToXy,
  type RgbTuple,
} from "./color";

export interface LightIntent {
  action: "on" | "off";
  /** 1..100 */
  brightnessPct?: number;
  color?: PaletteColor;
}

export interface SceneEntityPayload {
  state: "on" | "off";
  brightness?: number;
  color_temp_kelvin?: number;
  hs_color?: [number, number];
  xy_color?: [number, number];
  rgb_color?: [number, number, number];
}

export type TranslationStatus = "applied" | "skipped_no_color";

export interface TranslatedLightCommand {
  entityId: string;
  friendlyName: string;
  status: TranslationStatus;
  reason?: string;
  /** Für scene.apply & HA-Szenen */
  scenePayload?: SceneEntityPayload;
  /** Wenn true, soll bei Live-Steuerung natives `white: brightness` genutzt werden */
  preferNativeWhiteLive?: boolean;
  /** Vorschau-RGB für 3D/2D Glow */
  previewRgb?: RgbTuple;
  previewBrightness01: number;
  isOn: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function applyCalibratedHs(
  baseHs: [number, number],
  calibration?: EntityCalibration,
): [number, number] {
  const hueOffset = calibration?.hue_offset_deg ?? 0;
  const satScale = calibration?.saturation_scale ?? 1;
  const hue = (((baseHs[0] + hueOffset) % 360) + 360) % 360;
  const sat = clamp(baseHs[1] * satScale, 0, 100);
  return [Math.round(hue * 10) / 10, Math.round(sat * 10) / 10];
}

function applyCalibratedRgb(
  rgb: RgbTuple,
  calibration?: EntityCalibration,
): RgbTuple {
  if (!calibration || (!calibration.hue_offset_deg && calibration.saturation_scale === undefined)) {
    return rgb;
  }
  const hs = applyCalibratedHs(rgbToHs(rgb), calibration);
  return hsToRgb(hs[0], hs[1]);
}

export function translateLightCommand(
  entityId: string,
  entity: HassEntity | undefined,
  intent: LightIntent,
  calibration?: EntityCalibration,
): TranslatedLightCommand {
  const friendlyName = entity?.attributes.friendly_name ?? entityId;

  if (intent.action === "off") {
    return {
      entityId,
      friendlyName,
      status: "applied",
      scenePayload: { state: "off" },
      previewBrightness01: 0,
      isOn: false,
    };
  }

  const modes: LightColorMode[] = entity?.attributes.supported_color_modes ?? [];
  const rawBrightnessPct = intent.brightnessPct ?? 80;
  const brightnessScale = calibration?.brightness_scale ?? 1;
  const targetBrightness = clamp(
    Math.round((rawBrightnessPct / 100) * 255 * brightnessScale),
    1,
    255,
  );
  const previewBrightness01 = clamp(targetBrightness / 255, 0.05, 1);

  const supportsColorTemp = modes.includes("color_temp");
  const supportsHs = modes.includes("hs");
  const supportsXy = modes.includes("xy");
  const supportsRgb =
    modes.includes("rgb") || modes.includes("rgbw") || modes.includes("rgbww");
  const supportsWhite = modes.includes("white");
  const supportsAnyColor = supportsHs || supportsXy || supportsRgb;
  const isBrightnessOrSwitchOnly =
    modes.length > 0 && !supportsAnyColor && !supportsColorTemp;

  // Nur Helligkeit / Einschalten ohne neue Farbe
  if (!intent.color) {
    if (modes.includes("onoff") && modes.length === 1) {
      return {
        entityId,
        friendlyName,
        status: "applied",
        scenePayload: { state: "on" },
        previewBrightness01: 1,
        isOn: true,
      };
    }
    return {
      entityId,
      friendlyName,
      status: "applied",
      scenePayload: { state: "on", brightness: targetBrightness },
      previewBrightness01,
      isOn: true,
    };
  }

  // Buntfarbe gewählt
  if (intent.color.kind === "color") {
    if (isBrightnessOrSwitchOnly) {
      return {
        entityId,
        friendlyName,
        status: "skipped_no_color",
        reason: "Unterstützt keine Farben",
        previewBrightness01: 0,
        isOn: false,
      };
    }

    const baseRgb = hexToRgb(intent.color.hex);
    const calibratedRgb = applyCalibratedRgb(baseRgb, calibration);

    if (supportsHs) {
      const hs = applyCalibratedHs(rgbToHs(baseRgb), calibration);
      return {
        entityId,
        friendlyName,
        status: "applied",
        scenePayload: { state: "on", brightness: targetBrightness, hs_color: hs },
        previewRgb: calibratedRgb,
        previewBrightness01,
        isOn: true,
      };
    }

    if (supportsXy) {
      return {
        entityId,
        friendlyName,
        status: "applied",
        scenePayload: {
          state: "on",
          brightness: targetBrightness,
          xy_color: rgbToXy(calibratedRgb),
        },
        previewRgb: calibratedRgb,
        previewBrightness01,
        isOn: true,
      };
    }

    // RGB / Fallback
    return {
      entityId,
      friendlyName,
      status: "applied",
      scenePayload: {
        state: "on",
        brightness: targetBrightness,
        rgb_color: [calibratedRgb.r, calibratedRgb.g, calibratedRgb.b],
      },
      previewRgb: calibratedRgb,
      previewBrightness01,
      isOn: true,
    };
  }

  // Weißton (Kelvin) gewählt
  const targetKelvin = intent.color.kelvin ?? 2700;
  const whiteRgb = kelvinToRgb(targetKelvin);

  if (supportsColorTemp) {
    const minK = entity?.attributes.min_color_temp_kelvin ?? 2000;
    const maxK = entity?.attributes.max_color_temp_kelvin ?? 6535;
    const clampedK = Math.round(clamp(targetKelvin, minK, maxK));
    return {
      entityId,
      friendlyName,
      status: "applied",
      scenePayload: {
        state: "on",
        brightness: targetBrightness,
        color_temp_kelvin: clampedK,
      },
      previewRgb: kelvinToRgb(clampedK),
      previewBrightness01,
      isOn: true,
    };
  }

  // Tuya ["hs", "white"] (kein color_temp)
  if (supportsHs) {
    if (targetKelvin < 3800 || !supportsWhite) {
      const warmHsBase: [number, number] =
        calibration?.warm_white_hue_deg !== undefined &&
        calibration?.warm_white_saturation_pct !== undefined
          ? [calibration.warm_white_hue_deg, calibration.warm_white_saturation_pct]
          : kelvinToWarmHs(targetKelvin);
      const calibratedWarmHs = applyCalibratedHs(warmHsBase, calibration);
      return {
        entityId,
        friendlyName,
        status: "applied",
        scenePayload: {
          state: "on",
          brightness: targetBrightness,
          hs_color: calibratedWarmHs,
        },
        previewRgb: hsToRgb(calibratedWarmHs[0], calibratedWarmHs[1]),
        previewBrightness01,
        isOn: true,
      };
    }

    // Neutral-/Kaltweiß auf ["hs", "white"]: natives `white` für Live-Steuerung, sehr leicht entsättigtes HS für scene.apply/Szenen
    const neutralHs = applyCalibratedHs(rgbToHs(whiteRgb), calibration);
    return {
      entityId,
      friendlyName,
      status: "applied",
      preferNativeWhiteLive: supportsWhite,
      scenePayload: {
        state: "on",
        brightness: targetBrightness,
        hs_color: neutralHs,
      },
      previewRgb: whiteRgb,
      previewBrightness01,
      isOn: true,
    };
  }

  if (supportsXy) {
    return {
      entityId,
      friendlyName,
      status: "applied",
      scenePayload: {
        state: "on",
        brightness: targetBrightness,
        xy_color: rgbToXy(whiteRgb),
      },
      previewRgb: whiteRgb,
      previewBrightness01,
      isOn: true,
    };
  }

  if (supportsRgb) {
    return {
      entityId,
      friendlyName,
      status: "applied",
      scenePayload: {
        state: "on",
        brightness: targetBrightness,
        rgb_color: [whiteRgb.r, whiteRgb.g, whiteRgb.b],
      },
      previewRgb: whiteRgb,
      previewBrightness01,
      isOn: true,
    };
  }

  if (modes.includes("onoff") && modes.length === 1) {
    return {
      entityId,
      friendlyName,
      status: "applied",
      scenePayload: { state: "on" },
      previewRgb: whiteRgb,
      previewBrightness01: 1,
      isOn: true,
    };
  }

  // Reine Dimmer-Lampe bei Weißton: Helligkeit setzen
  return {
    entityId,
    friendlyName,
    status: "applied",
    scenePayload: { state: "on", brightness: targetBrightness },
    previewRgb: whiteRgb,
    previewBrightness01,
    isOn: true,
  };
}
