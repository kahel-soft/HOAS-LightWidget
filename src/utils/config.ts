import type {
  HoasLightWidgetConfig,
  Point2D,
  RoomBounds,
  RoomConfig,
} from "../types/config";

const DEFAULT_ROOM_HEIGHT_M = 2.5;

const DEFAULT_RECT_FLOOR: Point2D[] = [
  { x: 0, y: 0 },
  { x: 5, y: 0 },
  { x: 5, y: 4.5 },
  { x: 0, y: 4.5 },
];

export function isValidFloorPolygon(polygon: unknown): polygon is Point2D[] {
  if (!Array.isArray(polygon) || polygon.length < 3) {
    return false;
  }
  return polygon.every(
    (pt) =>
      typeof pt === "object" &&
      pt !== null &&
      typeof (pt as Point2D).x === "number" &&
      Number.isFinite((pt as Point2D).x) &&
      typeof (pt as Point2D).y === "number" &&
      Number.isFinite((pt as Point2D).y),
  );
}

export function computeRoomBounds(floorPolygon: Point2D[]): RoomBounds {
  if (floorPolygon.length === 0) {
    return { minX: 0, maxX: 5, minY: 0, maxY: 4.5, width: 5, depth: 4.5 };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const pt of floorPolygon) {
    if (pt.x < minX) minX = pt.x;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.y > maxY) maxY = pt.y;
  }

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: Math.max(0.5, maxX - minX),
    depth: Math.max(0.5, maxY - minY),
  };
}

function normalizeRoom(raw: Partial<RoomConfig>, index: number): RoomConfig {
  const floorPolygon = isValidFloorPolygon(raw.floor_polygon)
    ? raw.floor_polygon.map((p) => ({ x: p.x, y: p.y }))
    : DEFAULT_RECT_FLOOR.map((p) => ({ ...p }));

  const bounds = computeRoomBounds(floorPolygon);
  const centerX = bounds.minX + bounds.width / 2;

  return {
    id: raw.id && raw.id.trim().length > 0 ? raw.id.trim() : `room_${index + 1}`,
    name: raw.name && raw.name.trim().length > 0 ? raw.name.trim() : `Raum ${index + 1}`,
    area_id: raw.area_id,
    height_m:
      typeof raw.height_m === "number" && raw.height_m > 0.5
        ? raw.height_m
        : DEFAULT_ROOM_HEIGHT_M,
    floor_polygon: floorPolygon,
    inner_walls: Array.isArray(raw.inner_walls) ? raw.inner_walls : [],
    camera_pov: raw.camera_pov ?? {
      position: [centerX, bounds.maxY - 0.8, 1.25],
      target: [centerX, bounds.minY + 0.4, 1.0],
    },
    furniture: Array.isArray(raw.furniture) ? raw.furniture : [],
    lights: Array.isArray(raw.lights)
      ? raw.lights.filter((light) => Boolean(light?.entity_id && light?.geometry))
      : [],
  };
}

export function normalizeConfig(
  raw: Partial<HoasLightWidgetConfig> | undefined,
): HoasLightWidgetConfig {
  if (!raw || typeof raw !== "object") {
    throw new Error("Ungültige Karten-Konfiguration für hoas-light-widget.");
  }

  const rooms = Array.isArray(raw.rooms)
    ? raw.rooms.map((room, idx) => normalizeRoom(room, idx))
    : [];

  return {
    type: raw.type ?? "custom:hoas-light-widget",
    title: raw.title,
    default_room_id: raw.default_room_id ?? rooms[0]?.id,
    favorites: Array.isArray(raw.favorites) ? raw.favorites : [],
    recent_colors: Array.isArray(raw.recent_colors) ? raw.recent_colors : [],
    calibrations: raw.calibrations ?? {},
    rooms,
  };
}

export function getRoomById(
  config: HoasLightWidgetConfig,
  roomId: string | undefined,
): RoomConfig | undefined {
  if (config.rooms.length === 0) {
    return undefined;
  }
  if (roomId) {
    const match = config.rooms.find((room) => room.id === roomId);
    if (match) return match;
  }
  if (config.default_room_id) {
    const fallback = config.rooms.find((room) => room.id === config.default_room_id);
    if (fallback) return fallback;
  }
  return config.rooms[0];
}

export function createStubConfig(): HoasLightWidgetConfig {
  return {
    type: "custom:hoas-light-widget",
    title: "Licht-Studio",
    default_room_id: "wohnzimmer",
    rooms: [
      {
        id: "wohnzimmer",
        name: "Wohnzimmer",
        area_id: "wohnzimmer",
        height_m: 2.5,
        floor_polygon: [
          { x: 0, y: 0 },
          { x: 5.0, y: 0 },
          { x: 5.0, y: 4.5 },
          { x: 0, y: 4.5 },
        ],
        camera_pov: {
          position: [2.5, 3.6, 1.2],
          target: [2.5, 0.3, 1.0],
        },
        furniture: [
          {
            id: "tv",
            kind: "tv",
            label: "TV / Leinwand",
            position: [2.5, 0.15, 1.1],
            size: [1.8, 0.1, 1.0],
          },
          {
            id: "couch",
            kind: "couch",
            label: "Couch",
            position: [2.5, 3.65, 0.45],
            size: [2.4, 0.95, 0.85],
          },
        ],
        lights: [],
      },
    ],
  };
}
