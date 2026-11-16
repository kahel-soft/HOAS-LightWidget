export type LightColorMode =
  | "unknown"
  | "onoff"
  | "brightness"
  | "color_temp"
  | "hs"
  | "xy"
  | "rgb"
  | "rgbw"
  | "rgbww"
  | "white";

export interface HassLightAttributes {
  friendly_name?: string;
  brightness?: number;
  color_mode?: LightColorMode | null;
  supported_color_modes?: LightColorMode[];
  supported_features?: number;
  min_color_temp_kelvin?: number;
  max_color_temp_kelvin?: number;
  color_temp_kelvin?: number | null;
  hs_color?: [number, number] | null;
  rgb_color?: [number, number, number] | null;
  xy_color?: [number, number] | null;
  effect_list?: string[];
  effect?: string | null;
  entity_id?: string[];
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassLightAttributes;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  areas?: Record<string, { area_id: string; name: string; floor_id?: string | null }>;
  entities?: Record<string, { entity_id: string; area_id?: string | null; device_id?: string | null }>;
  devices?: Record<string, { id: string; area_id?: string | null }>;
  themes?: {
    darkMode?: boolean;
  };
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[]; area_id?: string | string[] },
  ) => Promise<unknown>;
  callApi?: <T = unknown>(
    method: string,
    path: string,
    parameters?: Record<string, unknown>,
  ) => Promise<T>;
  callWS?: <T = unknown>(msg: Record<string, unknown>) => Promise<T>;
}

export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  min_columns?: number;
  min_rows?: number;
}

export type Point2D = { x: number; y: number };
export type Point3D = [number, number, number];

export interface WallSegment {
  from: [number, number];
  to: [number, number];
  height_m?: number;
}

export type FurnitureKind =
  | "couch"
  | "tv"
  | "screen"
  | "sideboard"
  | "table"
  | "desk"
  | "bed"
  | "custom_box";

export interface FurnitureObject {
  id: string;
  kind: FurnitureKind;
  label?: string;
  position: Point3D;
  size: [number, number, number];
  rotation_deg?: number;
}

export type LightGeometry =
  | { type: "point"; position: Point3D; radius_m?: number }
  | { type: "vertical_column"; from: Point3D; to: Point3D; radius_m?: number }
  | { type: "polyline"; points: Point3D[]; thickness_m?: number };

export interface LightPlacement {
  /** Stabiler Home-Assistant entity_id Identifier (niemals device_id) */
  entity_id: string;
  label?: string;
  group_tag?: string;
  composite_id?: string;
  geometry: LightGeometry;
}

export interface RoomConfig {
  id: string;
  name: string;
  area_id?: string;
  height_m: number;
  /** Orthogonales Grundriss-Polygon in Metern (Rechteck, L-Form, 2 kombinierte Räume) */
  floor_polygon: Point2D[];
  inner_walls?: WallSegment[];
  camera_pov: {
    position: Point3D;
    target: Point3D;
  };
  furniture: FurnitureObject[];
  lights: LightPlacement[];
}

export interface PaletteColor {
  id: string;
  label: string;
  kind: "color" | "white";
  hex: string;
  kelvin?: number;
}

export interface EntityCalibration {
  hue_offset_deg?: number;
  saturation_scale?: number;
  brightness_scale?: number;
  warm_white_hue_deg?: number;
  warm_white_saturation_pct?: number;
}

export interface HoasLightWidgetConfig {
  type: string;
  title?: string;
  default_room_id?: string;
  favorites?: PaletteColor[];
  recent_colors?: PaletteColor[];
  calibrations?: Record<string, EntityCalibration>;
  rooms: RoomConfig[];
}

export interface RoomBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  width: number;
  depth: number;
}
