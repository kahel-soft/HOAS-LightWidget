import { describe, expect, it } from "vitest";
import {
  computeRoomBounds,
  createStubConfig,
  getRoomById,
  isValidFloorPolygon,
  normalizeConfig,
} from "../src/utils/config";

describe("HOAS LightWidget config utilities", () => {
  it("normalizes stub config with stable defaults", () => {
    const stub = createStubConfig();
    const normalized = normalizeConfig(stub);

    expect(normalized.rooms).toHaveLength(1);
    expect(normalized.default_room_id).toBe("wohnzimmer");
    expect(normalized.rooms[0].height_m).toBe(2.5);
  });

  it("computes room bounds for an L-shaped floor polygon", () => {
    const lShape = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 2.5, y: 2 },
      { x: 2.5, y: 4.5 },
      { x: 0, y: 4.5 },
    ];

    expect(isValidFloorPolygon(lShape)).toBe(true);
    expect(computeRoomBounds(lShape)).toEqual({
      minX: 0,
      maxX: 4,
      minY: 0,
      maxY: 4.5,
      width: 4,
      depth: 4.5,
    });
  });

  it("falls back to first room when requested room id does not exist", () => {
    const normalized = normalizeConfig({
      rooms: [
        { id: "a", name: "Wohnzimmer" },
        { id: "b", name: "Büro" },
      ] as never,
    });

    expect(getRoomById(normalized, "b")?.name).toBe("Büro");
    expect(getRoomById(normalized, "missing")?.id).toBe("a");
  });

  it("rejects non-object configurations", () => {
    expect(() => normalizeConfig(undefined)).toThrow();
  });
});
