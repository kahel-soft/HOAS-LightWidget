import type { HomeAssistant, RoomConfig } from "../types/config";
import type { VisualLightState } from "./color";
import type { SceneEntityPayload, TranslatedLightCommand } from "./color-translator";

export interface DispatchSummary {
  appliedCount: number;
  skipped: Array<{ entityId: string; friendlyName: string; reason: string }>;
}

export interface RoomSceneDraft {
  sceneId: string;
  name: string;
  icon: string;
  entities: Record<string, SceneEntityPayload | "off">;
}

export function slugifySceneId(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return base || `hoas_scene_${Date.now()}`;
}

export async function dispatchTranslatedCommands(
  hass: HomeAssistant,
  commands: TranslatedLightCommand[],
  transitionSec = 0.6,
): Promise<DispatchSummary> {
  const skipped: Array<{ entityId: string; friendlyName: string; reason: string }> = [];
  const sceneApplyEntities: Record<string, SceneEntityPayload | "off"> = {};
  const nativeWhiteLive: Array<{ entityId: string; brightness: number }> = [];

  for (const cmd of commands) {
    if (cmd.status === "skipped_no_color") {
      skipped.push({
        entityId: cmd.entityId,
        friendlyName: cmd.friendlyName,
        reason: cmd.reason ?? "Nicht unterstützt",
      });
      continue;
    }

    if (!cmd.scenePayload) continue;

    if (cmd.preferNativeWhiteLive && cmd.scenePayload.brightness !== undefined) {
      nativeWhiteLive.push({
        entityId: cmd.entityId,
        brightness: cmd.scenePayload.brightness,
      });
    } else if (cmd.scenePayload.state === "off") {
      sceneApplyEntities[cmd.entityId] = "off";
    } else {
      sceneApplyEntities[cmd.entityId] = cmd.scenePayload;
    }
  }

  const calls: Array<Promise<unknown>> = [];

  if (Object.keys(sceneApplyEntities).length > 0) {
    calls.push(
      hass.callService("scene", "apply", {
        entities: sceneApplyEntities,
        transition: transitionSec,
      }),
    );
  }

  for (const item of nativeWhiteLive) {
    calls.push(
      hass.callService(
        "light",
        "turn_on",
        { white: item.brightness, transition: transitionSec },
        { entity_id: item.entityId },
      ),
    );
  }

  await Promise.all(calls);

  return {
    appliedCount: Object.keys(sceneApplyEntities).length + nativeWhiteLive.length,
    skipped,
  };
}

export async function createRoomSnapshot(
  hass: HomeAssistant,
  room: RoomConfig,
  snapshotSceneId: string,
): Promise<void> {
  const entityIds = room.lights.map((l) => l.entity_id);
  if (entityIds.length === 0) return;

  await hass.callService("scene", "create", {
    scene_id: snapshotSceneId,
    snapshot_entities: entityIds,
  });
}

export async function restoreRoomSnapshot(
  hass: HomeAssistant,
  snapshotSceneId: string,
  transitionSec = 0.6,
): Promise<void> {
  await hass.callService(
    "scene",
    "turn_on",
    { transition: transitionSec },
    { entity_id: `scene.${snapshotSceneId}` },
  );
}

/**
 * Erfasst ALLE Lampen des Raums (inkl. explizitem "off" für ausgeschaltete Lampen).
 */
export function buildRoomSceneEntities(
  room: RoomConfig,
  hass: HomeAssistant | undefined,
  pendingPayloads: Map<string, SceneEntityPayload>,
  visualStates: Map<string, VisualLightState>,
): Record<string, SceneEntityPayload | "off"> {
  const entities: Record<string, SceneEntityPayload | "off"> = {};

  for (const light of room.lights) {
    const pending = pendingPayloads.get(light.entity_id);
    if (pending) {
      entities[light.entity_id] = pending.state === "off" ? "off" : pending;
      continue;
    }

    const visual = visualStates.get(light.entity_id);
    const live = hass?.states[light.entity_id];
    const isOn = visual ? visual.isOn : live?.state === "on";

    if (!isOn) {
      entities[light.entity_id] = "off";
      continue;
    }

    const attrs = live?.attributes ?? {};
    const brightness =
      typeof attrs.brightness === "number"
        ? attrs.brightness
        : Math.max(1, Math.round((visual?.brightness01 ?? 1) * 255));
    const entry: SceneEntityPayload = {
      state: "on",
      brightness,
    };

    const modes = attrs.supported_color_modes ?? [];
    if (attrs.color_mode === "color_temp" && typeof attrs.color_temp_kelvin === "number") {
      entry.color_temp_kelvin = attrs.color_temp_kelvin;
    } else if (Array.isArray(attrs.hs_color) && modes.includes("hs")) {
      entry.hs_color = attrs.hs_color;
    } else if (Array.isArray(attrs.xy_color) && modes.includes("xy")) {
      entry.xy_color = attrs.xy_color;
    } else if (Array.isArray(attrs.rgb_color) && modes.includes("rgb")) {
      entry.rgb_color = attrs.rgb_color;
    } else if (typeof attrs.color_temp_kelvin === "number") {
      entry.color_temp_kelvin = attrs.color_temp_kelvin;
    }

    entities[light.entity_id] = entry;
  }

  return entities;
}

export async function saveRoomScene(
  hass: HomeAssistant,
  draft: RoomSceneDraft,
): Promise<void> {
  if (!hass.callApi) {
    throw new Error(
      "Home Assistant Scene-Config-API (hass.callApi) ist in dieser Umgebung nicht verfügbar.",
    );
  }

  await hass.callApi("POST", `config/scene/config/${draft.sceneId}`, {
    id: draft.sceneId,
    name: draft.name,
    icon: draft.icon,
    entities: draft.entities,
  });

  await hass.callService("scene", "reload");
}
