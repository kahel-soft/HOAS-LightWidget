import type { HassEntity, HomeAssistant } from "../types/config";

export interface SelectableLightOption {
  entityId: string;
  name: string;
  areaId: string | null;
  areaName: string | null;
  isGroup: boolean;
  supportedColorModes: string[];
  state: string;
}

export function isLightGroupEntity(entity: HassEntity): boolean {
  const members = entity.attributes?.entity_id;
  return Array.isArray(members) && members.length > 0;
}

export function resolveEffectiveAreaId(
  hass: HomeAssistant | undefined,
  entityId: string,
): string | null {
  if (!hass) return null;
  const regEntry = hass.entities?.[entityId];
  if (regEntry?.area_id) {
    return regEntry.area_id;
  }
  if (regEntry?.device_id) {
    const devEntry = hass.devices?.[regEntry.device_id];
    if (devEntry?.area_id) {
      return devEntry.area_id;
    }
  }
  return null;
}

export function listSelectableLights(
  hass: HomeAssistant | undefined,
  options: { areaId?: string; includeGroups?: boolean } = {},
): SelectableLightOption[] {
  if (!hass) return [];

  const includeGroups = options.includeGroups ?? false;
  const results: SelectableLightOption[] = [];

  for (const entity of Object.values(hass.states)) {
    if (!entity.entity_id.startsWith("light.")) continue;
    const isGroup = isLightGroupEntity(entity);
    if (!includeGroups && isGroup) continue;

    const areaId = resolveEffectiveAreaId(hass, entity.entity_id);
    if (options.areaId && areaId !== options.areaId) {
      continue;
    }

    const areaName = areaId ? (hass.areas?.[areaId]?.name ?? areaId) : null;
    results.push({
      entityId: entity.entity_id,
      name: entity.attributes.friendly_name ?? entity.entity_id,
      areaId,
      areaName,
      isGroup,
      supportedColorModes: entity.attributes.supported_color_modes ?? [],
      state: entity.state,
    });
  }

  return results.sort((a, b) => a.name.localeCompare(b.name, "de"));
}
