import type { HassEntity, LightPlacement } from "../types/config";

export interface RgbTuple {
  r: number;
  g: number;
  b: number;
}

export interface VisualLightState {
  entityId: string;
  isOn: boolean;
  brightness01: number;
  rgb: RgbTuple;
  cssColor: string;
  hexColor: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function rgbToHex({ r, g, b }: RgbTuple): string {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToRgb(hex: string): RgbTuple {
  const cleaned = hex.trim().replace(/^#/, "");
  if (cleaned.length === 3) {
    const r = Number.parseInt(cleaned[0] + cleaned[0], 16);
    const g = Number.parseInt(cleaned[1] + cleaned[1], 16);
    const b = Number.parseInt(cleaned[2] + cleaned[2], 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return { r, g, b };
    }
  }
  if (cleaned.length === 6) {
    const r = Number.parseInt(cleaned.slice(0, 2), 16);
    const g = Number.parseInt(cleaned.slice(2, 4), 16);
    const b = Number.parseInt(cleaned.slice(4, 6), 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return { r, g, b };
    }
  }
  return { r: 255, g: 226, b: 176 };
}

export function rgbToHs({ r, g, b }: RgbTuple): [number, number] {
  const rn = clamp(r, 0, 255) / 255;
  const gn = clamp(g, 0, 255) / 255;
  const bn = clamp(b, 0, 255) / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let hue = 0;
  if (delta > 0.0001) {
    if (max === rn) {
      hue = 60 * (((gn - bn) / delta) % 6);
    } else if (max === gn) {
      hue = 60 * ((bn - rn) / delta + 2);
    } else {
      hue = 60 * ((rn - gn) / delta + 4);
    }
  }
  if (hue < 0) hue += 360;

  const sat = max === 0 ? 0 : (delta / max) * 100;
  return [Math.round(hue * 10) / 10, Math.round(sat * 10) / 10];
}

/**
 * Konvertiert sRGB in CIE 1931 xy-Farbkoordinaten (D65 Wide-Gamut-Matrix).
 */
export function rgbToXy({ r, g, b }: RgbTuple): [number, number] {
  const linearize = (channel: number) => {
    const c = clamp(channel, 0, 255) / 255;
    return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
  };

  const rl = linearize(r);
  const gl = linearize(g);
  const bl = linearize(b);

  const X = rl * 0.664511 + gl * 0.154324 + bl * 0.162028;
  const Y = rl * 0.283881 + gl * 0.668433 + bl * 0.047685;
  const Z = rl * 0.000088 + gl * 0.07231 + bl * 0.986039;
  const sum = X + Y + Z;
  if (sum <= 0.00001) {
    return [0.3127, 0.329];
  }

  return [
    Math.round((X / sum) * 10000) / 10000,
    Math.round((Y / sum) * 10000) / 10000,
  ];
}

/**
 * Berechnet einen warmen HS-Farbton aus einer Kelvin-Temperatur (ideal für Lampen ohne color_temp).
 */
export function kelvinToWarmHs(kelvin: number): [number, number] {
  const rgb = kelvinToRgb(kelvin);
  return rgbToHs(rgb);
}

export function rgbToCss({ r, g, b }: RgbTuple, alpha = 1): string {
  const rr = clamp(Math.round(r), 0, 255);
  const gg = clamp(Math.round(g), 0, 255);
  const bb = clamp(Math.round(b), 0, 255);
  if (alpha >= 1) {
    return `rgb(${rr}, ${gg}, ${bb})`;
  }
  return `rgba(${rr}, ${gg}, ${bb}, ${clamp(alpha, 0, 1).toFixed(3)})`;
}

/**
 * Konvertiert Hue (0..360) und Saturation (0..100) bei maximaler Helligkeit (V=1) in sRGB.
 */
export function hsToRgb(hueDeg: number, satPct: number): RgbTuple {
  const h = ((hueDeg % 360) + 360) % 360;
  const s = clamp(satPct, 0, 100) / 100;
  const c = s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = 1 - c;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (h < 60) {
    [r1, g1, b1] = [c, x, 0];
  } else if (h < 120) {
    [r1, g1, b1] = [x, c, 0];
  } else if (h < 180) {
    [r1, g1, b1] = [0, c, x];
  } else if (h < 240) {
    [r1, g1, b1] = [0, x, c];
  } else if (h < 300) {
    [r1, g1, b1] = [x, 0, c];
  } else {
    [r1, g1, b1] = [c, 0, x];
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

/**
 * Konvertiert CIE 1931 xy-Farbkoordinaten in sRGB (bei maximaler Helligkeit normalisiert).
 */
export function xyToRgb(x: number, y: number): RgbTuple {
  if (y <= 0.0001) {
    return { r: 255, g: 255, b: 255 };
  }
  const z = 1 - x - y;
  const Y = 1;
  const X = (Y / y) * x;
  const Z = (Y / y) * z;

  let r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
  let g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
  let b = X * 0.051713 - Y * 0.121364 + Z * 1.01153;

  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  const maxComponent = Math.max(r, g, b, 1);
  r /= maxComponent;
  g /= maxComponent;
  b /= maxComponent;

  const gammaCorrect = (u: number) =>
    u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 1 / 2.4) - 0.055;

  return {
    r: Math.round(clamp(gammaCorrect(r), 0, 1) * 255),
    g: Math.round(clamp(gammaCorrect(g), 0, 1) * 255),
    b: Math.round(clamp(gammaCorrect(b), 0, 1) * 255),
  };
}

/**
 * Approximiert eine Farbtemperatur in Kelvin (1500..10000 K) als sRGB-Farbe.
 */
export function kelvinToRgb(kelvin: number): RgbTuple {
  const temp = clamp(kelvin, 1500, 10000) / 100;
  let r: number;
  let g: number;
  let b: number;

  if (temp <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(temp) - 161.1195681661;
    b = temp <= 19 ? 0 : 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
    b = 255;
  }

  return {
    r: Math.round(clamp(r, 0, 255)),
    g: Math.round(clamp(g, 0, 255)),
    b: Math.round(clamp(b, 0, 255)),
  };
}

const OFF_RGB: RgbTuple = { r: 82, g: 82, b: 91 };
const DEFAULT_WHITE_RGB: RgbTuple = { r: 255, g: 226, b: 176 };

export function resolveEntityVisualState(
  light: LightPlacement,
  entity: HassEntity | undefined,
  previewOverride?: Partial<VisualLightState>,
): VisualLightState {
  if (previewOverride && previewOverride.rgb) {
    const isOn = previewOverride.isOn ?? true;
    const brightness01 = clamp(previewOverride.brightness01 ?? 1, 0.05, 1);
    return {
      entityId: light.entity_id,
      isOn,
      brightness01,
      rgb: previewOverride.rgb,
      cssColor: isOn ? rgbToCss(previewOverride.rgb) : rgbToCss(OFF_RGB),
      hexColor: isOn ? rgbToHex(previewOverride.rgb) : rgbToHex(OFF_RGB),
    };
  }

  if (!entity || entity.state !== "on") {
    return {
      entityId: light.entity_id,
      isOn: false,
      brightness01: 0,
      rgb: OFF_RGB,
      cssColor: rgbToCss(OFF_RGB),
      hexColor: rgbToHex(OFF_RGB),
    };
  }

  const attrs = entity.attributes ?? {};
  const rawBrightness = typeof attrs.brightness === "number" ? attrs.brightness : 255;
  const brightness01 = clamp(rawBrightness / 255, 0.08, 1);

  let rgb: RgbTuple = DEFAULT_WHITE_RGB;

  if (Array.isArray(attrs.rgb_color) && attrs.rgb_color.length === 3) {
    rgb = {
      r: clamp(attrs.rgb_color[0], 0, 255),
      g: clamp(attrs.rgb_color[1], 0, 255),
      b: clamp(attrs.rgb_color[2], 0, 255),
    };
  } else if (Array.isArray(attrs.hs_color) && attrs.hs_color.length === 2) {
    rgb = hsToRgb(attrs.hs_color[0], attrs.hs_color[1]);
  } else if (Array.isArray(attrs.xy_color) && attrs.xy_color.length === 2) {
    rgb = xyToRgb(attrs.xy_color[0], attrs.xy_color[1]);
  } else if (typeof attrs.color_temp_kelvin === "number") {
    rgb = kelvinToRgb(attrs.color_temp_kelvin);
  }

  return {
    entityId: light.entity_id,
    isOn: true,
    brightness01,
    rgb,
    cssColor: rgbToCss(rgb),
    hexColor: rgbToHex(rgb),
  };
}
