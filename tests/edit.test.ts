import { describe, expect, it } from "vitest";
import type { HomeAssistant } from "../src/types/config";
import {
  isLightGroupEntity,
  listSelectableLights,
  resolveEffectiveAreaId,
} from "../src/utils/entity-picker";
import {
  createCombinedRoomsPolygon,
  createLShapePolygon,
  createRectPolygon,
  getFurnitureLocalRects,
  insertPolygonVertexOnNearestEdge,
  removePolygonVertex,
  snapOrthogonalPoint,
} from "../src/utils/floor-editor";
import { resolveEffectiveLightStyle } from "../src/renderers/lights-3d";
import { clientToViewBoxCoords } from "../src/renderers/plan-2d";

const MOCK_HASS: HomeAssistant = {
  areas: {
    wohnzimmer: { area_id: "wohnzimmer", name: "Wohnzimmer" },
    flur: { area_id: "flur", name: "Flur" },
  },
  devices: {
    dev_sideboard: { id: "dev_sideboard", area_id: "wohnzimmer" },
  },
  entities: {
    "light.sideboard": { entity_id: "light.sideboard", area_id: null, device_id: "dev_sideboard" },
    "light.wandlampe_flur_1": { entity_id: "light.wandlampe_flur_1", area_id: "flur" },
  },
  states: {
    "light.sideboard": {
      entity_id: "light.sideboard",
      state: "off",
      attributes: { friendly_name: "Sideboard", supported_color_modes: ["color_temp", "hs"] },
    },
    "light.wandlampe_flur_1": {
      entity_id: "light.wandlampe_flur_1",
      state: "off",
      attributes: { friendly_name: "Wandlampe oben", supported_color_modes: ["brightness"] },
    },
    "light.wohnzimmer": {
      entity_id: "light.wohnzimmer",
      state: "off",
      attributes: {
        friendly_name: "Wohnzimmerlicht",
        entity_id: ["light.sideboard"],
      },
    },
  },
  async callService() {},
};

describe("Edit-Mode Entity Picker & Floor Sketcher", () => {
  it("resolves device-inherited area_id and excludes light groups by default", () => {
    expect(resolveEffectiveAreaId(MOCK_HASS, "light.sideboard")).toBe("wohnzimmer");
    expect(isLightGroupEntity(MOCK_HASS.states["light.wohnzimmer"])).toBe(true);

    const wohnzimmerOnly = listSelectableLights(MOCK_HASS, { areaId: "wohnzimmer" });
    expect(wohnzimmerOnly.map((o) => o.entityId)).toEqual(["light.sideboard"]);

    const withGroups = listSelectableLights(MOCK_HASS, { includeGroups: true });
    expect(withGroups.some((o) => o.entityId === "light.wohnzimmer")).toBe(true);
  });

  it("creates rect, L-shape, and combined dual-room polygons", () => {
    expect(createRectPolygon(5, 4)).toHaveLength(4);
    expect(createLShapePolygon(5, 4.5, 2, 2)).toHaveLength(6);
    expect(createCombinedRoomsPolygon(4.5, 4.5, 3.5, 3.5, 0.5).length).toBeGreaterThanOrEqual(6);
  });

  it("snaps sketched wall points orthogonally and preserves at least 3 vertices", () => {
    const snapped = snapOrthogonalPoint({ x: 0, y: 0 }, { x: 3.12, y: 0.41 }, 0.25);
    expect(snapped).toEqual({ x: 3, y: 0 });

    const tri = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
    ];
    expect(removePolygonVertex(tri, 0)).toHaveLength(3);
  });

  it("maps client pointer coordinates accurately into SVG viewBox space", () => {
    const pt = clientToViewBoxCoords(
      { left: 0, top: 0, width: 200, height: 200 },
      { x: -0.5, y: -0.5, width: 6, height: 6 },
      100,
      100,
    );
    expect(pt.x).toBeCloseTo(2.5, 4);
    expect(pt.y).toBeCloseTo(2.5, 4);
  });

  it("generates L-couch (2 rects), U-couch (3 rects), and inserts wall vertices on nearest edge", () => {
    const lRects = getFurnitureLocalRects({
      id: "c1",
      kind: "couch_l",
      position: [2, 3, 0.4],
      size: [2.6, 0.9, 0.85],
      l_side: "right",
    });
    const uRects = getFurnitureLocalRects({
      id: "c2",
      kind: "couch_u",
      position: [2, 3, 0.4],
      size: [3.0, 0.9, 0.85],
    });
    expect(lRects).toHaveLength(2);
    expect(uRects).toHaveLength(3);

    const rect = createRectPolygon(4, 4);
    const withExtra = insertPolygonVertexOnNearestEdge(rect, { x: 2.0, y: 0.1 }, 0.25);
    expect(withExtra).toHaveLength(5);
    expect(withExtra[1]).toEqual({ x: 2, y: 0 });
  });

  it("infers sensible light designs from geometry when visual_style is omitted", () => {
    expect(
      resolveEffectiveLightStyle({
        entity_id: "light.strip",
        geometry: {
          type: "polyline",
          points: [
            [0, 0, 1],
            [1, 0, 1],
          ],
        },
      }).kind,
    ).toBe("led_strip");

    expect(
      resolveEffectiveLightStyle({
        entity_id: "light.floor",
        geometry: { type: "vertical_column", from: [1, 1, 0.2], to: [1, 1, 1.5] },
      }).kind,
    ).toBe("floor_strip");

    expect(
      resolveEffectiveLightStyle({
        entity_id: "light.spot",
        visual_style: { kind: "spot", scale: 1.3, rotation_deg: 45 },
        geometry: { type: "point", position: [1, 1, 2] },
      }),
    ).toEqual({ kind: "spot", scale: 1.3, rotation_deg: 45 });
  });
});
