import { html, nothing } from "lit";
import type {
  FurnitureKind,
  FurnitureObject,
  HoasLightWidgetConfig,
  HomeAssistant,
  LightPlacement,
  LightVisualKind,
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
import { resolveEffectiveLightStyle } from "../renderers/lights-3d";

export type EditTab = "rooms" | "floor" | "furniture" | "lights" | "backup";

export interface EditPanelState {
  activeTab: EditTab;
  editTool: EditTool;
  sketchPoints: Point2D[];
  orthogonalSketch: boolean;
  selectedFurnitureId: string;
  selectedEditLightId: string;
  areaFilterOnly: boolean;
  includeGroups: boolean;
  newLightEntityId: string;
  newLightType: "point" | "vertical_column" | "polyline";
  newLightVisualKind: LightVisualKind;
  importText: string;
}

export interface EditPanelCallbacks {
  onSelectTab: (tab: EditTab, tool: EditTool) => void;
  onUpdateConfig: (nextConfig: HoasLightWidgetConfig, nextActiveRoomId?: string) => void;
  onUpdateRoom: (updater: (room: RoomConfig) => RoomConfig) => void;
  onSetState: (patch: Partial<EditPanelState>) => void;
  onNotify: (kind: "ok" | "warn" | "error", text: string) => void;
}

const LIGHT_DESIGN_OPTIONS: Array<[LightVisualKind, string]> = [
  ["bulb", "Lampe / Birne"],
  ["floor_lamp", "Stehlampe (Schirm)"],
  ["floor_strip", "Stehlampe (LED-Säule)"],
  ["led_strip", "LED-Strip (Band)"],
  ["spot", "Spot / Strahler (Kegel)"],
  ["table_lamp", "Tisch- / Bodenlampe"],
  ["ceiling", "Deckenleuchte / Panel"],
];

const FURNITURE_KIND_OPTIONS: Array<[FurnitureKind, string]> = [
  ["couch", "Couch (Gerade)"],
  ["couch_l", "Couch (L-Form)"],
  ["couch_u", "Couch (U-Form)"],
  ["wardrobe", "Schrank / Regal"],
  ["sideboard", "Sideboard / Lowboard"],
  ["tv", "TV / Leinwand"],
  ["table", "Tisch / Couchtisch"],
  ["desk", "Schreibtisch"],
  ["bed", "Bett"],
  ["custom_box", "Freier Block"],
];

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
            ["floor", "Raum & Grundriss", "floor"],
            ["furniture", "Möbel & Couch", "furniture"],
            ["lights", "Lichter & Design", "lights"],
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
        Ziehe die orangen Eckpunkte in der 2D-Draufsicht (0,25m-Raster) oder nutze Vorlagen,
        Skizzen-Modus, Innenwände &amp; Fenster/Türen:
      </div>

      <div class="edit-actions-row">
        <button
          type="button"
          class="action-btn"
          @click=${() => cb.onUpdateRoom((r) => ({ ...r, floor_polygon: createRectPolygon(5.2, 4.6) }))}
        >
          Rechteck
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
                    "Skizzier-Modus aktiv: Tippe Ecken nacheinander in die 2D-Draufsicht.",
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
        <label class="inline-check">
          <input
            type="checkbox"
            .checked=${panelState.orthogonalSketch}
            @change=${(e: Event) =>
              cb.onSetState({ orthogonalSketch: (e.target as HTMLInputElement).checked })}
          />
          90°-Snap
        </label>
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
        <button
          type="button"
          class="action-btn"
          @click=${() =>
            cb.onUpdateRoom((r) => ({
              ...r,
              wall_features: [
                ...(r.wall_features ?? []),
                { id: `win_${Date.now().toString(36)}`, kind: "window", from: [0, 1.2], to: [0, 2.8] },
              ],
            }))}
        >
          + Fenster
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() =>
            cb.onUpdateRoom((r) => ({
              ...r,
              wall_features: [
                ...(r.wall_features ?? []),
                { id: `door_${Date.now().toString(36)}`, kind: "door", from: [4.2, 0], to: [5.1, 0] },
              ],
            }))}
        >
          + Tür
        </button>
      </div>

      <div class="edit-grid">
        <label>
          Bodenfarbe
          <input
            type="color"
            .value=${room.theme?.floor_color ?? "#1d222c"}
            @input=${(e: Event) => {
              const floor_color = (e.target as HTMLInputElement).value;
              cb.onUpdateRoom((r) => ({ ...r, theme: { ...r.theme, floor_color } }));
            }}
          />
        </label>
        <label>
          Wandfarbe
          <input
            type="color"
            .value=${room.theme?.wall_color ?? "#334155"}
            @input=${(e: Event) => {
              const wall_color = (e.target as HTMLInputElement).value;
              cb.onUpdateRoom((r) => ({ ...r, theme: { ...r.theme, wall_color } }));
            }}
          />
        </label>
      </div>

      ${(room.wall_features ?? []).length > 0
        ? html`
            <div class="edit-list">
              ${(room.wall_features ?? []).map(
                (wf) => html`
                  <div class="edit-list-row">
                    <span>
                      ${wf.kind === "window" ? "Fenster" : "Tür"}: [${wf.from[0]},${wf.from[1]}] → [
                      ${wf.to[0]},${wf.to[1]}]
                    </span>
                    <button
                      type="button"
                      class="mini-tab"
                      @click=${() =>
                        cb.onUpdateRoom((r) => ({
                          ...r,
                          wall_features: (r.wall_features ?? []).filter((f) => f.id !== wf.id),
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
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() =>
                    cb.onUpdateRoom((r) => {
                      const nextPt = r.floor_polygon[(idx + 1) % r.floor_polygon.length];
                      const mid = {
                        x: Math.round(((pt.x + nextPt.x) / 2) * 4) / 4,
                        y: Math.round(((pt.y + nextPt.y) / 2) * 4) / 4,
                      };
                      const next = [...r.floor_polygon];
                      next.splice(idx + 1, 0, mid);
                      return { ...r, floor_polygon: next };
                    })}
                >
                  + Ecke danach
                </button>
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
  const addFurniture = (
    kind: FurnitureKind,
    label: string,
    size: [number, number, number],
    extra: Partial<FurnitureObject> = {},
  ) => {
    const id = `${kind}_${Date.now().toString(36)}`;
    const obj: FurnitureObject = {
      id,
      kind,
      label,
      position: [2.2, 2.2, size[2] / 2],
      size,
      rotation_deg: 0,
      ...extra,
    };
    cb.onUpdateRoom((r) => ({ ...r, furniture: [...r.furniture, obj] }));
    cb.onSetState({ selectedFurnitureId: id, editTool: "furniture" });
  };

  const selected =
    room.furniture.find((f) => f.id === panelState.selectedFurnitureId) ?? room.furniture[0];

  const updateSelected = (updater: (f: FurnitureObject) => FurnitureObject) => {
    if (!selected) return;
    cb.onUpdateRoom((r) => ({
      ...r,
      furniture: r.furniture.map((f) => (f.id === selected.id ? updater(f) : f)),
    }));
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
        <button
          type="button"
          class="action-btn"
          @click=${() =>
            addFurniture("couch_l", "L-Couch", [2.7, 0.95, 0.85], {
              l_side: "left",
              wing_width_m: 0.95,
              wing_depth_m: 1.25,
            })}
        >
          + L-Couch
        </button>
        <button
          type="button"
          class="action-btn"
          @click=${() =>
            addFurniture("couch_u", "U-Couch", [3.1, 0.95, 0.85], {
              wing_width_m: 0.9,
              wing_depth_m: 1.2,
            })}
        >
          + U-Couch
        </button>
        <button type="button" class="action-btn" @click=${() => addFurniture("wardrobe", "Schrank", [1.6, 0.6, 2.1])}>
          + Schrank
        </button>
        <button type="button" class="action-btn" @click=${() => addFurniture("sideboard", "Sideboard", [1.8, 0.45, 0.65])}>
          + Sideboard
        </button>
        <button type="button" class="action-btn" @click=${() => addFurniture("tv", "TV / Leinwand", [1.8, 0.1, 1.0])}>
          + TV
        </button>
        <button type="button" class="action-btn" @click=${() => addFurniture("table", "Tisch", [1.2, 0.75, 0.45])}>
          + Tisch
        </button>
      </div>

      <div class="edit-list">
        ${room.furniture.map(
          (item) => html`
            <div
              class="edit-list-row"
              style=${selected?.id === item.id ? "border-color:#38bdf8" : ""}
            >
              <button
                type="button"
                class="mini-tab ${selected?.id === item.id ? "active" : ""}"
                @click=${() => cb.onSetState({ selectedFurnitureId: item.id })}
              >
                ${item.label ?? item.kind}
              </button>
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab"
                  @click=${() =>
                    cb.onUpdateRoom((r) => ({
                      ...r,
                      furniture: r.furniture.map((f) =>
                        f.id === item.id
                          ? { ...f, rotation_deg: ((f.rotation_deg ?? 0) + 45) % 360 }
                          : f,
                      ),
                    }))}
                >
                  +45°
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

      ${selected
        ? html`
            <div class="edit-grid">
              <label>
                Möbel-Form
                <select
                  .value=${selected.kind}
                  @change=${(e: Event) => {
                    const kind = (e.target as HTMLSelectElement).value as FurnitureKind;
                    updateSelected((f) => ({ ...f, kind }));
                  }}
                >
                  ${FURNITURE_KIND_OPTIONS.map(
                    ([val, text]) => html`<option value=${val}>${text}</option>`,
                  )}
                </select>
              </label>
              <label>
                Bezeichnung
                <input
                  type="text"
                  .value=${selected.label ?? ""}
                  @input=${(e: Event) =>
                    updateSelected((f) => ({ ...f, label: (e.target as HTMLInputElement).value }))}
                />
              </label>
              <label>
                Breite (m): ${selected.size[0].toFixed(2)}
                <input
                  type="number"
                  step="0.1"
                  min="0.3"
                  max="6"
                  .value=${String(selected.size[0])}
                  @change=${(e: Event) => {
                    const w = Math.max(0.3, Number((e.target as HTMLInputElement).value));
                    updateSelected((f) => ({ ...f, size: [w, f.size[1], f.size[2]] }));
                  }}
                />
              </label>
              <label>
                Tiefe (m): ${selected.size[1].toFixed(2)}
                <input
                  type="number"
                  step="0.05"
                  min="0.05"
                  max="4"
                  .value=${String(selected.size[1])}
                  @change=${(e: Event) => {
                    const d = Math.max(0.05, Number((e.target as HTMLInputElement).value));
                    updateSelected((f) => ({ ...f, size: [f.size[0], d, f.size[2]] }));
                  }}
                />
              </label>
              <label>
                Höhe (m): ${selected.size[2].toFixed(2)}
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="3"
                  .value=${String(selected.size[2])}
                  @change=${(e: Event) => {
                    const h = Math.max(0.1, Number((e.target as HTMLInputElement).value));
                    updateSelected((f) => ({
                      ...f,
                      size: [f.size[0], f.size[1], h],
                      position: [f.position[0], f.position[1], h / 2],
                    }));
                  }}
                />
              </label>
              <label>
                Drehung (°): ${selected.rotation_deg ?? 0}°
                <input
                  type="number"
                  step="15"
                  min="0"
                  max="345"
                  .value=${String(selected.rotation_deg ?? 0)}
                  @change=${(e: Event) =>
                    updateSelected((f) => ({
                      ...f,
                      rotation_deg: Number((e.target as HTMLInputElement).value) % 360,
                    }))}
                />
              </label>
              <label>
                Farbe
                <input
                  type="color"
                  .value=${selected.color ?? "#3b4454"}
                  @input=${(e: Event) =>
                    updateSelected((f) => ({ ...f, color: (e.target as HTMLInputElement).value }))}
                />
              </label>
              ${selected.kind === "couch_l"
                ? html`
                    <label>
                      Schenkel-Seite
                      <select
                        .value=${selected.l_side ?? "left"}
                        @change=${(e: Event) =>
                          updateSelected((f) => ({
                            ...f,
                            l_side: (e.target as HTMLSelectElement).value as "left" | "right",
                          }))}
                      >
                        <option value="left">Links</option>
                        <option value="right">Rechts</option>
                      </select>
                    </label>
                  `
                : nothing}
              ${selected.kind === "couch_l" || selected.kind === "couch_u"
                ? html`
                    <label>
                      Schenkel-Länge (m)
                      <input
                        type="number"
                        step="0.1"
                        min="0.6"
                        max="3"
                        .value=${String(selected.wing_depth_m ?? 1.15)}
                        @change=${(e: Event) =>
                          updateSelected((f) => ({
                            ...f,
                            wing_depth_m: Number((e.target as HTMLInputElement).value),
                          }))}
                      />
                    </label>
                  `
                : nothing}
            </div>
          `
        : nothing}
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
      visual_style: { kind: panelState.newLightVisualKind, scale: 1, rotation_deg: 0 },
      geometry,
    };
    cb.onUpdateRoom((r) => ({ ...r, lights: [...r.lights, placement] }));
    cb.onSetState({ selectedEditLightId: selectedOption });
    cb.onNotify("ok", `${opt?.name ?? selectedOption} hinzugefügt – in Drauf-/Frontalansicht ziehen!`);
  };

  const editedLight =
    room.lights.find((l) => l.entity_id === panelState.selectedEditLightId) ?? room.lights[0];

  const updateEditedLight = (updater: (l: LightPlacement) => LightPlacement) => {
    if (!editedLight) return;
    cb.onUpdateRoom((r) => ({
      ...r,
      lights: r.lights.map((l) => (l.entity_id === editedLight.entity_id ? updater(l) : l)),
    }));
  };

  return html`
    <div class="edit-stack">
      <div class="modes-badge">
        Ziehe Lichter in der <strong>Draufsicht</strong> (X/Y) und in der{" "}
        <strong>Frontalansicht</strong> (Höhe Z) und wähle unten das Lampen-Design.
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
          Geometrie
          <select
            .value=${panelState.newLightType}
            @change=${(e: Event) => {
              const type = (e.target as HTMLSelectElement).value as
                | "point"
                | "vertical_column"
                | "polyline";
              const defaultKind: LightVisualKind =
                type === "polyline"
                  ? "led_strip"
                  : type === "vertical_column"
                    ? "floor_strip"
                    : "bulb";
              cb.onSetState({ newLightType: type, newLightVisualKind: defaultKind });
            }}
          >
            <option value="point">Punkt / Einzel-Leuchte</option>
            <option value="vertical_column">Vertikale Säule</option>
            <option value="polyline">3D-Pfad / Über Eck</option>
          </select>
        </label>
        <label>
          Lampen-Design
          <select
            .value=${panelState.newLightVisualKind}
            @change=${(e: Event) =>
              cb.onSetState({
                newLightVisualKind: (e.target as HTMLSelectElement).value as LightVisualKind,
              })}
          >
            ${LIGHT_DESIGN_OPTIONS.map(
              ([val, text]) => html`<option value=${val}>${text}</option>`,
            )}
          </select>
        </label>
        <button type="button" class="action-btn primary" @click=${addLight}>+ Licht platzieren</button>
      </div>

      <div class="edit-list">
        ${room.lights.map((light) => {
          const style = resolveEffectiveLightStyle(light);
          const isEditingThis = editedLight?.entity_id === light.entity_id;
          return html`
            <div class="edit-list-row" style=${isEditingThis ? "border-color:#38bdf8" : ""}>
              <button
                type="button"
                class="mini-tab ${isEditingThis ? "active" : ""}"
                @click=${() => cb.onSetState({ selectedEditLightId: light.entity_id })}
              >
                ${light.label ?? light.entity_id} · [${style.kind}]
              </button>
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
                  ×
                </button>
              </div>
            </div>
          `;
        })}
      </div>

      ${editedLight
        ? (() => {
            const effStyle = resolveEffectiveLightStyle(editedLight);
            return html`
              <div class="edit-grid">
                <label>
                  Design für "${editedLight.label ?? editedLight.entity_id}"
                  <select
                    .value=${effStyle.kind}
                    @change=${(e: Event) => {
                      const kind = (e.target as HTMLSelectElement).value as LightVisualKind;
                      updateEditedLight((l) => ({
                        ...l,
                        visual_style: { ...resolveEffectiveLightStyle(l), kind },
                      }));
                    }}
                  >
                    ${LIGHT_DESIGN_OPTIONS.map(
                      ([val, text]) => html`<option value=${val}>${text}</option>`,
                    )}
                  </select>
                </label>
                <label>
                  Name / Label
                  <input
                    type="text"
                    .value=${editedLight.label ?? ""}
                    @input=${(e: Event) =>
                      updateEditedLight((l) => ({
                        ...l,
                        label: (e.target as HTMLInputElement).value,
                      }))}
                  />
                </label>
                <label>
                  Gruppe-Tag (z. B. Front)
                  <input
                    type="text"
                    .value=${editedLight.group_tag ?? ""}
                    @input=${(e: Event) =>
                      updateEditedLight((l) => ({
                        ...l,
                        group_tag: (e.target as HTMLInputElement).value || undefined,
                      }))}
                  />
                </label>
                <label>
                  Größe: ${(effStyle.scale ?? 1).toFixed(1)}×
                  <input
                    type="range"
                    min="0.6"
                    max="1.8"
                    step="0.1"
                    .value=${String(effStyle.scale ?? 1)}
                    @input=${(e: Event) => {
                      const scale = Number((e.target as HTMLInputElement).value);
                      updateEditedLight((l) => ({
                        ...l,
                        visual_style: { ...resolveEffectiveLightStyle(l), scale },
                      }));
                    }}
                  />
                </label>
                <label>
                  Ausrichtung (°): ${effStyle.rotation_deg ?? 0}°
                  <input
                    type="range"
                    min="0"
                    max="345"
                    step="15"
                    .value=${String(effStyle.rotation_deg ?? 0)}
                    @input=${(e: Event) => {
                      const rotation_deg = Number((e.target as HTMLInputElement).value);
                      updateEditedLight((l) => ({
                        ...l,
                        visual_style: { ...resolveEffectiveLightStyle(l), rotation_deg },
                      }));
                    }}
                  />
                </label>
              </div>
            `;
          })()
        : nothing}
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
