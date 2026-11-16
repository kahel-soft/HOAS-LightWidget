import type { HoasLightWidgetConfig, HomeAssistant } from "../src/types/config";

export function createMockHass(onServiceCall?: (entry: string) => void): HomeAssistant {
  return {
    themes: { darkMode: true },
    areas: {
      wohnzimmer: { area_id: "wohnzimmer", name: "Wohnzimmer" },
      gamingzone_buro: { area_id: "gamingzone_buro", name: "Büro Kai" },
      flur: { area_id: "flur", name: "Flur" },
    },
    devices: {
      dev_sideboard: { id: "dev_sideboard", area_id: "wohnzimmer" },
    },
    entities: {
      "light.wohnzimmer_floor_lamp": { entity_id: "light.wohnzimmer_floor_lamp", area_id: "wohnzimmer" },
      "light.sideboard": { entity_id: "light.sideboard", area_id: null, device_id: "dev_sideboard" },
      "light.gaming_ambilight": { entity_id: "light.gaming_ambilight", area_id: "gamingzone_buro" },
      "light.wandlampe_flur_1": { entity_id: "light.wandlampe_flur_1", area_id: "flur" },
    },
    states: {
      "light.wohnzimmer_floor_lamp": {
        entity_id: "light.wohnzimmer_floor_lamp",
        state: "on",
        attributes: {
          friendly_name: "Stehlampe Links Hauptlicht",
          supported_color_modes: ["hs", "white"],
          color_mode: "hs",
          brightness: 190,
          hs_color: [28, 72],
          rgb_color: [255, 165, 71],
        },
      },
      "light.wohnzimmer_floor_lamp_sockel": {
        entity_id: "light.wohnzimmer_floor_lamp_sockel",
        state: "on",
        attributes: {
          friendly_name: "Stehlampe Links Sockel",
          supported_color_modes: ["hs", "white"],
          color_mode: "hs",
          brightness: 140,
          hs_color: [24, 80],
          rgb_color: [255, 132, 51],
        },
      },
      "light.wohnzimmer_floor_lamp_2": {
        entity_id: "light.wohnzimmer_floor_lamp_2",
        state: "on",
        attributes: {
          friendly_name: "Stehlampe Rechts Hauptlicht",
          supported_color_modes: ["hs", "white"],
          color_mode: "hs",
          brightness: 190,
          hs_color: [28, 72],
          rgb_color: [255, 165, 71],
        },
      },
      "light.wohnzimmer_floor_lamp_2_sockel": {
        entity_id: "light.wohnzimmer_floor_lamp_2_sockel",
        state: "off",
        attributes: {
          friendly_name: "Stehlampe Rechts Sockel",
          supported_color_modes: ["hs", "white"],
        },
      },
      "light.wohnzimmer_bodenlampe_rechts": {
        entity_id: "light.wohnzimmer_bodenlampe_rechts",
        state: "on",
        attributes: {
          friendly_name: "Bodenlampe Rechts",
          supported_color_modes: ["color_temp", "xy"],
          min_color_temp_kelvin: 2000,
          max_color_temp_kelvin: 6535,
          color_mode: "color_temp",
          brightness: 180,
          color_temp_kelvin: 2700,
          rgb_color: [255, 169, 87],
        },
      },
      "light.wohnzimmer_wandlicht": {
        entity_id: "light.wohnzimmer_wandlicht",
        state: "on",
        attributes: {
          friendly_name: "Wandlicht",
          supported_color_modes: ["hs", "white"],
          color_mode: "hs",
          brightness: 160,
          hs_color: [215, 70],
          rgb_color: [76, 152, 255],
        },
      },
      "light.wohnzimmer_led_couch": {
        entity_id: "light.wohnzimmer_led_couch",
        state: "on",
        attributes: {
          friendly_name: "LED Couch",
          supported_color_modes: ["hs", "white"],
          color_mode: "hs",
          brightness: 120,
          hs_color: [275, 65],
          rgb_color: [189, 89, 255],
        },
      },
      "light.sideboard": {
        entity_id: "light.sideboard",
        state: "off",
        attributes: {
          friendly_name: "Sideboard",
          supported_color_modes: ["color_temp", "hs"],
          min_color_temp_kelvin: 2000,
          max_color_temp_kelvin: 6535,
        },
      },
      "light.gaming_ambilight": {
        entity_id: "light.gaming_ambilight",
        state: "on",
        attributes: {
          friendly_name: "Gaming - Ambilight",
          supported_color_modes: ["color_temp", "hs"],
          min_color_temp_kelvin: 2700,
          max_color_temp_kelvin: 6500,
          color_mode: "hs",
          brightness: 237,
          hs_color: [242, 38],
          rgb_color: [161, 158, 255],
        },
      },
      "light.wandlampe_flur_1": {
        entity_id: "light.wandlampe_flur_1",
        state: "off",
        attributes: {
          friendly_name: "Wandlampe oben",
          supported_color_modes: ["brightness"],
        },
      },
      "scene.filmabend": {
        entity_id: "scene.filmabend",
        state: "2026-10-17T20:15:45",
        attributes: { friendly_name: "Filmabend" },
      },
      "scene.gemutlich": {
        entity_id: "scene.gemutlich",
        state: "2026-10-17T20:15:45",
        attributes: { friendly_name: "Gemütlich" },
      },
    },
    async callService(domain, service, serviceData, target) {
      const entry = `${domain}.${service} -> ${JSON.stringify({ target, serviceData })}`;
      onServiceCall?.(entry);
    },
    async callApi<T>(method: string, path: string, parameters?: Record<string, unknown>) {
      const entry = `API ${method} ${path} -> ${JSON.stringify(parameters ?? {})}`;
      onServiceCall?.(entry);
      return { result: "ok" } as T;
    },
  };
}

export const DEMO_CONFIG: HoasLightWidgetConfig = {
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
        { x: 5.2, y: 0 },
        { x: 5.2, y: 4.6 },
        { x: 0, y: 4.6 },
      ],
      camera_pov: {
        position: [2.6, 3.65, 1.2],
        target: [2.6, 0.25, 1.0],
      },
      furniture: [
        {
          id: "tv",
          kind: "tv",
          label: "TV / Leinwand",
          position: [2.6, 0.12, 1.15],
          size: [1.9, 0.08, 1.05],
        },
        {
          id: "couch",
          kind: "couch_l",
          label: "L-Couch",
          position: [2.6, 3.7, 0.42],
          size: [2.7, 0.95, 0.85],
          l_side: "left",
          wing_width_m: 0.95,
          wing_depth_m: 1.25,
        },
        {
          id: "schrank",
          kind: "wardrobe",
          label: "Schrank",
          position: [0.35, 1.6, 1.0],
          size: [0.55, 1.4, 2.0],
        },
      ],
      lights: [
        {
          entity_id: "light.wohnzimmer_floor_lamp",
          label: "Stehlampe L Haupt",
          composite_id: "stehlampe_l",
          group_tag: "Front",
          visual_style: { kind: "floor_strip", scale: 1.0 },
          geometry: { type: "vertical_column", from: [1.1, 0.35, 0.35], to: [1.1, 0.35, 1.55] },
        },
        {
          entity_id: "light.wohnzimmer_floor_lamp_sockel",
          label: "Stehlampe L Sockel",
          composite_id: "stehlampe_l",
          group_tag: "Front",
          visual_style: { kind: "table_lamp", scale: 0.9 },
          geometry: { type: "point", position: [1.1, 0.35, 0.18] },
        },
        {
          entity_id: "light.wohnzimmer_floor_lamp_2",
          label: "Stehlampe R Haupt",
          composite_id: "stehlampe_r",
          group_tag: "Front",
          visual_style: { kind: "floor_lamp", scale: 1.0 },
          geometry: { type: "vertical_column", from: [4.1, 0.35, 0.35], to: [4.1, 0.35, 1.55] },
        },
        {
          entity_id: "light.wohnzimmer_floor_lamp_2_sockel",
          label: "Stehlampe R Sockel",
          composite_id: "stehlampe_r",
          group_tag: "Front",
          visual_style: { kind: "table_lamp", scale: 0.9 },
          geometry: { type: "point", position: [4.1, 0.35, 0.18] },
        },
        {
          entity_id: "light.wohnzimmer_bodenlampe_rechts",
          label: "Bodenlampe R",
          group_tag: "Front",
          visual_style: { kind: "bulb", scale: 1.1 },
          geometry: { type: "point", position: [4.65, 0.55, 0.2] },
        },
        {
          entity_id: "light.wohnzimmer_wandlicht",
          label: "Wandlicht Links",
          group_tag: "Front",
          visual_style: { kind: "spot", scale: 1.1, rotation_deg: 180 },
          geometry: { type: "point", position: [0.45, 0.4, 1.8] },
        },
        {
          entity_id: "light.wohnzimmer_led_couch",
          label: "LED Couch (Eck)",
          group_tag: "Hinten",
          visual_style: { kind: "led_strip", scale: 1.0 },
          geometry: {
            type: "polyline",
            points: [
              [0.15, 3.1, 0.9],
              [0.15, 4.45, 0.9],
              [3.9, 4.45, 0.9],
            ],
          },
        },
      ],
    },
    {
      id: "buro_kai",
      name: "Büro Kai",
      area_id: "gamingzone_buro",
      height_m: 2.5,
      floor_polygon: [
        { x: 0, y: 0 },
        { x: 4.0, y: 0 },
        { x: 4.0, y: 2.4 },
        { x: 2.4, y: 2.4 },
        { x: 2.4, y: 3.8 },
        { x: 0, y: 3.8 },
      ],
      camera_pov: {
        position: [1.5, 2.6, 1.2],
        target: [1.5, 0.2, 1.0],
      },
      furniture: [
        {
          id: "desk",
          kind: "desk",
          label: "Schreibtisch",
          position: [1.5, 0.45, 0.74],
          size: [1.8, 0.8, 0.06],
        },
      ],
      lights: [
        {
          entity_id: "light.gaming_ambilight",
          label: "Gaming Ambilight",
          geometry: { type: "point", position: [1.5, 0.1, 1.15] },
        },
        {
          entity_id: "light.wandlampe_flur_1",
          label: "Dimmer-Test (nur Helligkeit)",
          geometry: { type: "point", position: [0.3, 1.5, 1.8] },
        },
      ],
    },
  ],
};
