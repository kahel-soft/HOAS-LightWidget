import { describe, expect, it } from "vitest";
import type { HassEntity, LightPlacement } from "../src/types/config";
import {
  hsToRgb,
  kelvinToRgb,
  resolveEntityVisualState,
  rgbToHex,
  xyToRgb,
} from "../src/utils/color";

const SAMPLE_LIGHT: LightPlacement = {
  entity_id: "light.test_lamp",
  geometry: { type: "point", position: [1, 1, 1] },
};

describe("color conversion & entity visual resolution", () => {
  it("converts HS colors accurately to sRGB", () => {
    expect(hsToRgb(0, 100)).toEqual({ r: 255, g: 0, b: 0 });
    expect(hsToRgb(120, 100)).toEqual({ r: 0, g: 255, b: 0 });
    expect(hsToRgb(240, 100)).toEqual({ r: 0, g: 0, b: 255 });
    expect(hsToRgb(180, 0)).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("converts CIE xy coordinates to valid sRGB", () => {
    const white = xyToRgb(0.3127, 0.329);
    expect(white.r).toBeGreaterThan(220);
    expect(white.g).toBeGreaterThan(220);
    expect(white.b).toBeGreaterThan(220);
  });

  it("approximates warm vs cool Kelvin temperatures", () => {
    const warm = kelvinToRgb(2200);
    const cool = kelvinToRgb(6500);

    expect(warm.r).toBeGreaterThan(warm.b);
    expect(cool.b).toBeGreaterThan(warm.b);
  });

  it("resolves off state as dark muted color", () => {
    const entity: HassEntity = {
      entity_id: "light.test_lamp",
      state: "off",
      attributes: {},
    };
    const state = resolveEntityVisualState(SAMPLE_LIGHT, entity);
    expect(state.isOn).toBe(false);
    expect(state.brightness01).toBe(0);
    expect(state.hexColor).toBe("#52525b");
  });

  it("resolves color_temp_kelvin when rgb_color is absent", () => {
    const entity: HassEntity = {
      entity_id: "light.test_lamp",
      state: "on",
      attributes: {
        brightness: 128,
        color_temp_kelvin: 2400,
      },
    };
    const state = resolveEntityVisualState(SAMPLE_LIGHT, entity);
    expect(state.isOn).toBe(true);
    expect(state.brightness01).toBeCloseTo(128 / 255, 2);
    expect(state.rgb.r).toBeGreaterThan(state.rgb.b);
  });

  it("prefers previewOverride over live HA entity state", () => {
    const entity: HassEntity = {
      entity_id: "light.test_lamp",
      state: "off",
      attributes: {},
    };
    const state = resolveEntityVisualState(SAMPLE_LIGHT, entity, {
      isOn: true,
      brightness01: 0.75,
      rgb: { r: 10, g: 200, b: 255 },
    });

    expect(state.isOn).toBe(true);
    expect(state.brightness01).toBe(0.75);
    expect(rgbToHex(state.rgb)).toBe("#0ac8ff");
  });
});
