import { html, nothing } from "lit";
import type {
  FurnitureKind,
  FurnitureObject,
  HoasLightWidgetConfig,
  HomeAssistant,
  LightPlacement,
  Point2D,
  RoomConfig,
} from "../types/config";
import type { EditTool } from "../renderers/plan-2d";
import { listSelectableLights } from "../utils/entity-picker";
import {
  createCombinedRoomsPolygon,
  createLShapePolygon,
  createRectPolygon,
  removePolygonVertex,
} from "../utils/floor-editor";
import { normalizeConfig } from "../utils/config";

export type EditTab = "rooms" | "floor" | "furniture" | "lights" | "backup";

export interface EditPanelState {
  activeTab: EditTab;
  editTool: EditTool;
  sketchPoints: Point2D[];
  areaFilterOnly: boolean;
  includeGroups: boolean;
  newLightEntityId: string;
  newLightType: "point" | "vertical_column" | "polyline";
  importText: string;
}

export interface EditPanelCallbacks {
  onSelectTab: (tab: EditTab, tool: EditTool) => void;
  onUpdateConfig: (nextConfig: HoasLightWidgetConfig, nextActiveRoomId?: string) => void;
  onUpdateRoom: (updater: (room: RoomConfig) => RoomConfig) => void;
  onSetState: (patch: Partial<EditPanelState>) => void;
  onNotify: (kind: "ok" | "warn" | "error", text: string) => void;
}

export function renderEditPanel(
  config: HoasLightWidgetConfig,
  room: RoomConfig,
  hass: HomeAssistant | undefined,
  panelState: EditPanelState,
  cb: EditPanelCallbacks,
) {
  return html`
    <div class="edit-panel">
      <div class="edit-tabs">
        ${(
          [
            ["rooms", "Räume", "lights"],
            ["floor", "Grundriss", "floor"],
            ["furniture", "Möbel & POV", "furniture"],
            ["lights", "Lichter (X/Y/Z)", "lights"],
            ["backup", "Export / Import", "lights"],
          ] as Array<[EditTab, string, EditTool]>
        ).map(
          ([tab, label, tool]) => html`
            <button
              type="button"
              class="mini-tab ${panelState.activeTab === tab ? "active" : ""}"
              @click=${() => cb.onSelectTab(tab, tool)}
            >
              ${label}
            </button>
          `,
        )}
      </div>

      ${panelState.activeTab === "rooms"
        ? renderRoomsTab(config, room, hass, cb)
        : panelState.activeTab === "floor"
          ? renderFloorTab(room, panelState, cb)
          : panelState.activeTab === "furniture"
            ? renderFurnitureTab(room, panelState, cb)
            : panelState.activeTab === "lights"
              ? renderLightsTab(room, hass, panelState, cb)
              : renderBackupTab(config, panelState, cb)}
    </div>
  `;
}

function renderRoomsTab(
  config: HoasLightWidgetConfig,
  room: RoomConfig,
  hass: HomeAssistant | undefined,
  cb: EditPanelCallbacks,
) {
  const areas = Object.values(hass?.areas ?? {}).sort((a, b) =>
    a.name.localeCompare(b.name, "de"),
  );

  const addRoom = () => {
    const idx = config.rooms.length + 1;
    const id = `raum_${Date.now().toString(36)}`;
    const newRoom: RoomConfig = {
      id,
      name: `Raum ${idx}`,
      height_m: 2.5,
      floor_polygon: createRectPolygon(4.5, 4.0),
      camera_pov: { position: [2.25, 3.2, 1.2], target: [2.25, 0.3, 1.0] },
      furniture: [],
      lights: [],
    };
    cb.onUpdateConfig({ ...config, rooms: [...config.rooms, newRoom] }, id);
    cb.onNotify("ok", `Neuer Raum "${newRoom.name}" angelegt.`);
  };

  const deleteRoom = () => {
    if (config.rooms.length <= 1) {
      cb.onNotify("warn", "Mindestens ein Raum muss erhalten bleiben.");
      return;
    }
    const remaining = config.rooms.filter((r) => r.id !== room.id);
    cb.onUpdateConfig(
      {
        ...config,
        default_room_id:
          config.default_room_id === room.id ? remaining[0].id : config.default_room_id,
        rooms: remaining,
      },
      remaining[0].id,
    );
  };

  return html`
    <div class="edit-grid">
      <label>
        Raumname
        <input
          type="text"
          .value=${room.name}
          @input=${(e: Event) => {
            const name = (e.target as HTMLInputElement).value;
            cb.onUpdateRoom((r) => ({ ...r, name }));
          }}
        />
      </label>
      <label>
        Deckenhöhe (m)
        <input
          type="number"
          step="0.1"
          min="1.8"
          max="6.0"
          .value=${String(room.height_m)}
          @change=${(e: Event) => {
            const h = Number((e.target as HTMLInputElement).value);
            if (h >= 1.8) cb.onUpdateRoom((r) => ({ ...r, height_m: h }));
          }}
        />
      </label>
      <label>
        HA-Bereich (area_id)
        <select
          .value=${room.area_id ?? ""}
          @change=${(e: Event) => {
            const areaId = (e.target as HTMLSelectElement).value || undefined;
            cb.onUpdateRoom((r) => ({ ...r, area_id: areaId }));
          }}
        >
          <option value="">– Kein fester Bereich –</option>
          ${areas.map((a) => html`<option value=${a.area_id}>${a.name} (${a.area_id})</option>`)}
        </select>
      </label>
      <div class="edit-actions-row">
        <button type="button" class="action-btn primary" @click=${addRoom}>+ Neuer Raum</button>
        <button type="button" class="action-btn danger" @click=${deleteRoom}>Raum löschen</button>
      </div>
    </div>
  `;
}

function renderFloorTab(
  room: RoomConfig,
  panelState: EditPanelState,
  cb: EditPanelCallbacks,
) {
  const isSketching = panelState.sketchPoints.length > 0;

  const finishSketch = () => {
    if (panelState.sketchPoints.length < 3) {
      cb.onNotify("warn", "Bitte mindestens 3 Punkte in der 2D-Draufsicht antippen.");
      return;
    }
    const pts = panelState.sketchPoints;
    cb.onUpdateRoom((r) => ({ ...r, floor_polygon: pts }));
    cb.onSetState({ sketchPoints: [] });
    cb.onNotify("ok", `Grundriss mit ${pts.length} Ecken übernommen.`);
  };

  return html`
    <div class="edit-stack">
      <div class="modes-badge">
        Ziehe die orangen Eckpunkte direkt in der 2D-Draufsicht (0,25m-Raster) oder nutze eine
        Vorlage / freies Skizzieren:
      </div>

      <div class="edit-actions-row">
        <button
          type="button"
          class="action-btn"
          @click=${() => cb.onUpdateRoom((r) => ({ ...r, floor_polygon: createRectPolygon(5.2, 4.6) }))}
        >
          Rechteck (5,2×4,6m)
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() =>
            cb.onUpdateRoom((r) => ({ ...r, floor_polygon: createLShapePolygon(5.5, 4.5, 2.0, 2.0) }))}
        >
          L-Form
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() =>
            cb.onUpdateRoom((r) => ({
              ...r,
              floor_polygon: createCombinedRoomsPolygon(4.5, 4.5, 3.5, 3.5, 0.5),
            }))}
        >
          2 Räume kombiniert
        </button>
      </div>

      <div class="edit-actions-row">
        ${!isSketching
          ? html`
              <button
                type="button"
                class="action-btn primary"
                @click=${() => {
                  cb.onSetState({
                    editTool: "floor",
                    sketchPoints: [{ x: 0, y: 0 }],
                  });
                  cb.onNotify(
                    "ok",
                    "Skizzier-Modus aktiv: Tippe Ecken nacheinander in die 2D-Draufsicht (orthogonal eingerastet).",
                  );
                }}
              >
                Grundriss neu skizzieren
              </button>
            `
          : html`
              <button type="button" class="action-btn primary" @click=${finishSketch}>
                Skizze übernehmen (${panelState.sketchPoints.length} Pkt)
              </button>
              <button
                type="button"
                class="action-btn"
                @click=${() => cb.onSetState({ sketchPoints: [] })}
              >
                Abbrechen
              </button>
            `}
        <button
          type="button"
          class="action-btn"
          @click=${() =>
            cb.onUpdateRoom((r) => ({
              ...r,
              inner_walls: [...(r.inner_walls ?? []), { from: [2.5, 0], to: [2.5, 1.8] }],
            }))}
        >
          + Innenwand
        </button>
      </div>

      ${(room.inner_walls ?? []).length > 0
        ? html`
            <div class="edit-list">
              ${(room.inner_walls ?? []).map(
                (w, idx) => html`
                  <div class="edit-list-row">
                    <span>Wand ${idx + 1}: [${w.from[0]},${w.from[1]}] → [${w.to[0]},${w.to[1]}]</span>
                    <button
                      type="button"
                      class="mini-tab"
                      @click=${() =>
                        cb.onUpdateRoom((r) => ({
                          ...r,
                          inner_walls: (r.inner_walls ?? []).filter((_, i) => i !== idx),
                        }))}
                    >
                      Entfernen
                    </button>
                  </div>
                `,
              )}
            </div>
          `
        : nothing}

      <div class="edit-list">
        ${room.floor_polygon.map(
          (pt, idx) => html`
            <div class="edit-list-row">
              <span>Ecke ${idx + 1}: (${pt.x.toFixed(2)}m, ${pt.y.toFixed(2)}m)</span>
              <button
                type="button"
                class="mini-tab"
                ?disabled=${room.floor_polygon.length <= 3}
                @click=${() =>
                  cb.onUpdateRoom((r) => ({
                    ...r,
                    floor_polygon: removePolygonVertex(r.floor_polygon, idx),
                  }))}
              >
                ×
              </button>
            </div>
          `,
        )}
      </div>
    </div>
  `;
}

function renderFurnitureTab(
  room: RoomConfig,
  panelState: EditPanelState,
  cb: EditPanelCallbacks,
) {
  const addFurniture = (kind: FurnitureKind, label: string, size: [number, number, number]) => {
    const obj: FurnitureObject = {
      id: `${kind}_${Date.now().toString(36)}`,
      kind,
      label,
      position: [2.0, 2.0, size[2] / 2],
      size,
      rotation_deg: 0,
    };
    cb.onUpdateRoom((r) => ({ ...r, furniture: [...r.furniture, obj] }));
  };

  return html`
    <div class="edit-stack">
      <div class="edit-actions-row">
        <button
          type="button"
          class="mini-tab ${panelState.editTool === "furniture" ? "active" : ""}"
          @click=${() => cb.onSetState({ editTool: "furniture" })}
        >
          Möbel verschieben
        </button>
        <button
          type="button"
          class="mini-tab ${panelState.editTool === "camera" ? "active" : ""}"
          @click=${() => cb.onSetState({ editTool: "camera" })}
        >
          Couch-Kamera (POV) setzen
        </button>
      </div>

      <div class="edit-actions-row">
        <button type="button" class="action-btn" @click=${() => addFurniture("couch", "Couch", [2.4, 0.95, 0.85])}>
          + Couch
        </button>
        <button type="button" class="action-btn" @click=${() => addFurniture("tv", "TV / Leinwand", [1.8, 0.1, 1.0])}>
          + TV
        </button>
        <button type="button" class="action-btn" @click=${() => addFurniture("sideboard", "Sideboard", [1.6, 0.45, 0.7])}>
          + Sideboard
        </button>
        <button type="button" class="action-btn" @click=${() => addFurniture("desk", "Schreibtisch", [1.6, 0.8, 0.74])}>
          + Tisch
        </button>
      </div>

      <div class="edit-list">
        ${room.furniture.map(
          (item) => html`
            <div class="edit-list-row">
              <span>${item.label ?? item.kind} (${item.position[0].toFixed(1)}m, ${item.position[1].toFixed(1)}m)</span>
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() =>
                    cb.onUpdateRoom((r) => ({
                      ...r,
                      furniture: r.furniture.map((f) =>
                        f.id === item.id
                          ? { ...f, rotation_deg: ((f.rotation_deg ?? 0) + 90) % 360 }
                          : f,
                      ),
                    }))}
                >
                  90°
                </button>
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() =>
                    cb.onUpdateRoom((r) => ({
                      ...r,
                      furniture: r.furniture.filter((f) => f.id !== item.id),
                    }))}
                >
                  ×
                </button>
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `;
}

function renderLightsTab(
  room: RoomConfig,
  hass: HomeAssistant | undefined,
  panelState: EditPanelState,
  cb: EditPanelCallbacks,
) {
  const options = listSelectableLights(hass, {
    areaId: panelState.areaFilterOnly ? room.area_id : undefined,
    includeGroups: panelState.includeGroups,
  });

  const selectedOption = panelState.newLightEntityId || options[0]?.entityId || "";

  const addLight = () => {
    if (!selectedOption) {
      cb.onNotify("warn", "Keine Licht-Entity ausgewählt.");
      return;
    }
    if (room.lights.some((l) => l.entity_id === selectedOption)) {
      cb.onNotify("warn", `${selectedOption} ist in diesem Raum bereits platziert.`);
      return;
    }
    const opt = options.find((o) => o.entityId === selectedOption);
    let geometry: LightPlacement["geometry"];
    if (panelState.newLightType === "vertical_column") {
      geometry = { type: "vertical_column", from: [2.0, 1.0, 0.3], to: [2.0, 1.0, 1.55] };
    } else if (panelState.newLightType === "polyline") {
      geometry = {
        type: "polyline",
        points: [
          [0.5, 3.5, 0.9],
          [0.5, 4.2, 0.9],
          [2.5, 4.2, 0.9],
        ],
      };
    } else {
      geometry = { type: "point", position: [2.0, 1.5, 1.0] };
    }

    const placement: LightPlacement = {
      entity_id: selectedOption,
      label: opt?.name,
      geometry,
    };
    cb.onUpdateRoom((r) => ({ ...r, lights: [...r.lights, placement] }));
    cb.onNotify("ok", `${opt?.name ?? selectedOption} hinzugefügt – jetzt in Drauf-/Frontalansicht ziehen!`);
  };

  return html`
    <div class="edit-stack">
      <div class="modes-badge">
        Ziehe Lichter in der <strong>Draufsicht</strong> (X/Y) und in der{" "}
        <strong>Frontalansicht</strong> (Höhe Z).
      </div>

      <div class="edit-actions-row">
        <label class="inline-check">
          <input
            type="checkbox"
            .checked=${panelState.areaFilterOnly}
            ?disabled=${!room.area_id}
            @change=${(e: Event) =>
              cb.onSetState({ areaFilterOnly: (e.target as HTMLInputElement).checked })}
          />
          Nur Bereich "${room.area_id ?? "alle"}"
        </label>
        <label class="inline-check">
          <input
            type="checkbox"
            .checked=${panelState.includeGroups}
            @change=${(e: Event) =>
              cb.onSetState({ includeGroups: (e.target as HTMLInputElement).checked })}
          />
          Gruppen anzeigen
        </label>
      </div>

      <div class="edit-grid">
        <label>
          HA-Lichtquelle (entity_id)
          <select
            .value=${selectedOption}
            @change=${(e: Event) =>
              cb.onSetState({ newLightEntityId: (e.target as HTMLSelectElement).value })}
          >
            ${options.length === 0
              ? html`<option value="">Keine passenden Lampen gefunden</option>`
              : options.map(
                  (o) => html`
                    <option value=${o.entityId}>
                      ${o.name} [${o.supportedColorModes.join(",") || "onoff"}]
                    </option>
                  `,
                )}
          </select>
        </label>
        <label>
          Darstellungsform
          <select
            .value=${panelState.newLightType}
            @change=${(e: Event) =>
              cb.onSetState({
                newLightType: (e.target as HTMLSelectElement).value as
                  | "point"
                  | "vertical_column"
                  | "polyline",
              })}
          >
            <option value="point">Punkt / Lampe</option>
            <option value="vertical_column">Stehlampe (Vertikal-Säule)</option>
            <option value="polyline">LED-Strip (3D-Pfad / über Eck)</option>
          </select>
        </label>
        <button type="button" class="action-btn primary" @click=${addLight}>+ Licht platzieren</button>
      </div>

      <div class="edit-list">
        ${room.lights.map((light) => {
          const coords =
            light.geometry.type === "point"
              ? `(${light.geometry.position.map((v) => v.toFixed(2)).join(", ")})`
              : light.geometry.type === "vertical_column"
                ? `Z: ${light.geometry.from[2].toFixed(2)}–${light.geometry.to[2].toFixed(2)}m`
                : `${light.geometry.points.length} Pkt`;

          return html`
            <div class="edit-list-row">
              <span>${light.label ?? light.entity_id} · ${coords}</span>
              <div class="subview-tabs">
                ${light.geometry.type === "polyline"
                  ? html`
                      <button
                        type="button"
                        class="mini-tab"
                        @click=${() =>
                          cb.onUpdateRoom((r) => ({
                            ...r,
                            lights: r.lights.map((l) => {
                              if (l.entity_id !== light.entity_id || l.geometry.type !== "polyline") {
                                return l;
                              }
                              const last = l.geometry.points[l.geometry.points.length - 1] ?? [1, 1, 0.9];
                              return {
                                ...l,
                                geometry: {
                                  ...l.geometry,
                                  points: [...l.geometry.points, [last[0] + 0.5, last[1], last[2]]],
                                },
                              };
                            }),
                          }))}
                      >
                        + Pkt
                      </button>
                    `
                  : nothing}
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() =>
                    cb.onUpdateRoom((r) => ({
                      ...r,
                      lights: r.lights.filter((l) => l.entity_id !== light.entity_id),
                    }))}
                >
                  Entfernen
                </button>
              </div>
            </div>
          `;
        })}
      </div>
    </div>
  `;
}

function renderBackupTab(
  config: HoasLightWidgetConfig,
  panelState: EditPanelState,
  cb: EditPanelCallbacks,
) {
  const jsonString = JSON.stringify(config, null, 2);

  const copyJson = async () => {
    try {
      await navigator.clipboard?.writeText(jsonString);
      cb.onNotify("ok", "Card-Konfiguration (JSON) in Zwischenablage kopiert.");
    } catch {
      cb.onSetState({ importText: jsonString });
      cb.onNotify("warn", "Zwischenablage blockiert – JSON im Textfeld angezeigt.");
    }
  };

  const applyImport = () => {
    try {
      const parsed = JSON.parse(panelState.importText);
      const normalized = normalizeConfig(parsed);
      cb.onUpdateConfig(normalized, normalized.rooms[0]?.id);
      cb.onNotify("ok", `Konfiguration mit ${normalized.rooms.length} Raum/Räumen importiert.`);
    } catch (err) {
      cb.onNotify(
        "error",
        `Ungültiges JSON: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  const copySubviewYaml = async () => {
    const yaml = [
      "title: Licht-Studio",
      "path: licht-studio",
      "subview: true",
      "back_path: /lovelace/home",
      "type: panel",
      "cards:",
      "  - type: custom:hoas-light-widget",
      `    default_room_id: ${config.default_room_id ?? config.rooms[0]?.id ?? "wohnzimmer"}`,
    ].join("\n");
    try {
      await navigator.clipboard?.writeText(yaml);
      cb.onNotify("ok", "Subview-YAML (Panel-Modus) in Zwischenablage kopiert.");
    } catch {
      cb.onSetState({ importText: yaml });
      cb.onNotify("warn", "Zwischenablage blockiert – Subview-YAML im Textfeld angezeigt.");
    }
  };

  return html`
    <div class="edit-stack">
      <div class="edit-actions-row">
        <button type="button" class="action-btn" @click=${copyJson}>JSON kopieren</button>
        <button type="button" class="action-btn" @click=${copySubviewYaml}>
          Subview-YAML kopieren
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() => cb.onSetState({ importText: jsonString })}
        >
          Aktuelle Config laden
        </button>
        <button type="button" class="action-btn primary" @click=${applyImport}>JSON importieren</button>
      </div>
      <textarea
        rows="6"
        placeholder="JSON-Konfiguration hier einfügen zum Importieren oder Anzeigen…"
        .value=${panelState.importText}
        @input=${(e: Event) =>
          cb.onSetState({ importText: (e.target as HTMLTextAreaElement).value })}
      ></textarea>
    </div>
  `;
}
