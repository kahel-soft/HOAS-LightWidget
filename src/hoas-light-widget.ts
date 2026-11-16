import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  EntityCalibration,
  HoasLightWidgetConfig,
  LovelaceGridOptions,
  PaletteColor,
  RoomConfig,
} from "./types/config";
import { createStubConfig, getRoomById, normalizeConfig } from "./utils/config";
import { resolveEntityVisualState, type VisualLightState } from "./utils/color";
import {
  COLOR_PALETTE,
  DEFAULT_FAVORITES,
  WHITE_PALETTE,
  pushRecentColor,
  toggleFavoriteColor,
} from "./utils/palette";
import {
  translateLightCommand,
  type LightIntent,
  type SceneEntityPayload,
} from "./utils/color-translator";
import {
  buildRoomSceneEntities,
  createRoomSnapshot,
  dispatchTranslatedCommands,
  restoreRoomSnapshot,
  saveRoomScene,
  slugifySceneId,
} from "./utils/ha-scenes";
import { snapOrthogonalPoint, snapToGrid } from "./utils/floor-editor";
import { PreviewStage3D, type CameraPreset } from "./renderers/preview-stage";
import {
  renderFrontSvg,
  renderTopDownSvg,
  type EditInteractionHandlers,
} from "./renderers/plan-2d";
import { renderEditPanel, type EditPanelState } from "./components/edit-panel";
import {
  CALIBRATION_TEST_ANCHORS,
  renderCalibrationWizard,
  type CalibrationWizardState,
} from "./components/calibration-wizard";
import { cardStyles } from "./styles/card-styles";
import "./editor";
import "./panel";

const STORAGE_PREFS_KEY = "hoas-light-widget:prefs:v1";

interface CustomCardRegistration {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}

declare global {
  interface Window {
    customCards?: CustomCardRegistration[];
  }
}

@customElement("hoas-light-widget")
export class HoasLightWidget extends LitElement {
  public static override styles = cardStyles;

  @property({ attribute: false })
  public hass?: import("./types/config").HomeAssistant;

  @property({ type: Boolean, reflect: true })
  public fullwidth = false;

  @state()
  private _config?: HoasLightWidgetConfig;

  @state()
  private _activeRoomId?: string;

  @state()
  private _editUnlocked = false;

  @state()
  private _editState: EditPanelState = {
    activeTab: "lights",
    editTool: "lights",
    sketchPoints: [],
    orthogonalSketch: true,
    selectedFurnitureId: "",
    selectedEditLightId: "",
    areaFilterOnly: false,
    includeGroups: false,
    newLightEntityId: "",
    newLightType: "point",
    newLightVisualKind: "bulb",
    importText: "",
  };

  @state()
  private _multiSelectMode = false;

  @state()
  private _selectedIds: string[] = [];

  @state()
  private _cameraPreset: CameraPreset = "pov";

  @state()
  private _secondaryView: "top" | "front" = "top";

  @state()
  private _webglUnavailable = false;

  @state()
  private _brightnessPct = 80;

  @state()
  private _activeColor?: PaletteColor;

  @state()
  private _favorites: PaletteColor[] = [...DEFAULT_FAVORITES];

  @state()
  private _recentColors: PaletteColor[] = [];

  @state()
  private _previewOverrides = new Map<string, Partial<VisualLightState>>();

  @state()
  private _pendingPayloads = new Map<string, SceneEntityPayload>();

  @state()
  private _snapshotCreatedForRoom?: string;

  @state()
  private _statusBanner?: { kind: "warn" | "ok" | "error"; text: string };

  @state()
  private _sceneModalOpen = false;

  @state()
  private _sceneMode: "new" | "overwrite" = "new";

  @state()
  private _sceneName = "";

  @state()
  private _sceneTargetId = "";

  @state()
  private _sceneSaving = false;

  @state()
  private _wizardState: CalibrationWizardState = {
    open: false,
    step: 1,
    referenceEntityId: "",
    targetEntityId: "",
    testColor: CALIBRATION_TEST_ANCHORS[0],
    draft: {},
  };

  private _stage3d: PreviewStage3D | null = null;
  private _brightnessTimer?: ReturnType<typeof setTimeout>;
  private _wizardTimer?: ReturnType<typeof setTimeout>;
  private _longPressTimer?: ReturnType<typeof setTimeout>;
  private _longPressTriggered = false;

  public static getStubConfig(): HoasLightWidgetConfig {
    return createStubConfig();
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("hoas-light-widget-editor");
  }

  public setConfig(config: Partial<HoasLightWidgetConfig>): void {
    const normalized = normalizeConfig(config);
    this._config = normalized;
    if (!this._activeRoomId || !getRoomById(normalized, this._activeRoomId)) {
      this._activeRoomId = normalized.default_room_id ?? normalized.rooms[0]?.id;
    }
    const prefs = this._loadLocalPrefs();
    this._favorites =
      normalized.favorites && normalized.favorites.length > 0
        ? [...normalized.favorites]
        : prefs.favorites ?? [...DEFAULT_FAVORITES];
    this._recentColors =
      normalized.recent_colors && normalized.recent_colors.length > 0
        ? [...normalized.recent_colors]
        : prefs.recent_colors ?? [];
    this._selectedIds = [];
    this._previewOverrides = new Map();
    this._pendingPayloads = new Map();
  }

  private _loadLocalPrefs(): { favorites?: PaletteColor[]; recent_colors?: PaletteColor[] } {
    try {
      const raw = window.localStorage?.getItem(STORAGE_PREFS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return typeof parsed === "object" && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  }

  private _saveLocalPrefs(): void {
    try {
      window.localStorage?.setItem(
        STORAGE_PREFS_KEY,
        JSON.stringify({
          favorites: this._favorites,
          recent_colors: this._recentColors,
        }),
      );
    } catch {
      // Ignorieren falls Storage blockiert
    }
  }

  public getCardSize(): number {
    return 9;
  }

  public getGridSize(): LovelaceGridOptions {
    return {
      columns: 12,
      rows: 11,
      min_columns: 6,
      min_rows: 8,
    };
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._brightnessTimer) clearTimeout(this._brightnessTimer);
    if (this._wizardTimer) clearTimeout(this._wizardTimer);
    if (this._longPressTimer) clearTimeout(this._longPressTimer);
    this._stage3d?.dispose();
    this._stage3d = null;
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);
    const activeRoom = this._getActiveRoom();
    if (!activeRoom) {
      return;
    }

    if (!this._stage3d) {
      const mount = this.renderRoot.querySelector<HTMLElement>(".stage-3d");
      if (mount) {
        this._stage3d = new PreviewStage3D(mount, {
          onSelectLight: (entityId, additive) => this._handleLightSelection(entityId, additive),
        });
        this._webglUnavailable = !this._stage3d.isWebGLReady;
        this._stage3d.renderRoom(activeRoom, this._cameraPreset);
      }
    } else if (changedProperties.has("_config") || changedProperties.has("_activeRoomId")) {
      this._stage3d.renderRoom(activeRoom, this._cameraPreset);
    } else if (changedProperties.has("_cameraPreset")) {
      this._stage3d.setCameraPreset(this._cameraPreset);
    }

    if (this._stage3d) {
      const visualStates = this._buildVisualStates(activeRoom);
      this._stage3d.updateLightStates(visualStates, new Set(this._selectedIds));
    }
  }

  private _getActiveRoom(): RoomConfig | undefined {
    if (!this._config) return undefined;
    return getRoomById(this._config, this._activeRoomId);
  }

  private _commitConfig(nextConfig: HoasLightWidgetConfig, nextActiveRoomId?: string): void {
    this._config = nextConfig;
    if (nextActiveRoomId) {
      this._activeRoomId = nextActiveRoomId;
    }
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: nextConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _updateActiveRoom(updater: (room: RoomConfig) => RoomConfig): void {
    if (!this._config) return;
    const current = this._getActiveRoom();
    if (!current) return;
    const updatedRoom = updater(current);
    const nextConfig: HoasLightWidgetConfig = {
      ...this._config,
      rooms: this._config.rooms.map((r) => (r.id === current.id ? updatedRoom : r)),
    };
    this._commitConfig(nextConfig);
  }

  private _buildVisualStates(room: RoomConfig): Map<string, VisualLightState> {
    const map = new Map<string, VisualLightState>();
    for (const light of room.lights) {
      const entity = this.hass?.states[light.entity_id];
      const override = this._previewOverrides.get(light.entity_id);
      map.set(light.entity_id, resolveEntityVisualState(light, entity, override));
    }
    return map;
  }

  private _selectRoom(roomId: string): void {
    this._activeRoomId = roomId;
    this._selectedIds = [];
    this._previewOverrides = new Map();
    this._pendingPayloads = new Map();
    this._snapshotCreatedForRoom = undefined;
    this._statusBanner = undefined;
    this._editState = { ...this._editState, sketchPoints: [] };
  }

  private _toggleEditLock(): void {
    this._editUnlocked = !this._editUnlocked;
    if (!this._editUnlocked) {
      this._editState = { ...this._editState, sketchPoints: [] };
    }
  }

  private _setCameraPreset(preset: CameraPreset): void {
    this._cameraPreset = preset;
    this._stage3d?.setCameraPreset(preset);
  }

  private _handleLightSelection(entityId: string, additive: boolean): void {
    const useMulti = this._multiSelectMode || additive;
    if (useMulti) {
      if (this._selectedIds.includes(entityId)) {
        this._selectedIds = this._selectedIds.filter((id) => id !== entityId);
      } else {
        this._selectedIds = [...this._selectedIds, entityId];
      }
    } else {
      this._selectedIds =
        this._selectedIds.length === 1 && this._selectedIds[0] === entityId ? [] : [entityId];
    }

    if (this._selectedIds.length === 1) {
      const entity = this.hass?.states[this._selectedIds[0]];
      if (entity && typeof entity.attributes.brightness === "number") {
        this._brightnessPct = Math.max(1, Math.round((entity.attributes.brightness / 255) * 100));
      }
    }
  }

  private _selectByGroupTag(room: RoomConfig, tag: string): void {
    this._selectedIds = room.lights
      .filter((light) => light.group_tag === tag)
      .map((light) => light.entity_id);
  }

  private _selectAllLights(room: RoomConfig): void {
    this._selectedIds = room.lights.map((light) => light.entity_id);
  }

  private _clearSelection(): void {
    this._selectedIds = [];
  }

  private _buildEditHandlers(): EditInteractionHandlers | undefined {
    if (!this._editUnlocked) return undefined;

    return {
      enabled: true,
      tool: this._editState.editTool,
      sketchPoints: this._editState.sketchPoints,
      selectedFurnitureId: this._editState.selectedFurnitureId,
      onSelectFurniture: (furnitureId) => {
        this._editState = { ...this._editState, selectedFurnitureId: furnitureId };
      },
      onMoveLightXY: (entityId, x, y, polylineIdx) => {
        this._updateActiveRoom((room) => ({
          ...room,
          lights: room.lights.map((light) => {
            if (light.entity_id !== entityId) return light;
            if (light.geometry.type === "point") {
              return {
                ...light,
                geometry: { ...light.geometry, position: [x, y, light.geometry.position[2]] },
              };
            }
            if (light.geometry.type === "vertical_column") {
              return {
                ...light,
                geometry: {
                  ...light.geometry,
                  from: [x, y, light.geometry.from[2]],
                  to: [x, y, light.geometry.to[2]],
                },
              };
            }
            if (light.geometry.type === "polyline" && polylineIdx !== undefined) {
              return {
                ...light,
                geometry: {
                  ...light.geometry,
                  points: light.geometry.points.map((pt, idx) =>
                    idx === polylineIdx ? [x, y, pt[2]] : pt,
                  ),
                },
              };
            }
            return light;
          }),
        }));
      },
      onMoveLightXZ: (entityId, x, z, part) => {
        this._updateActiveRoom((room) => ({
          ...room,
          lights: room.lights.map((light) => {
            if (light.entity_id !== entityId) return light;
            if (light.geometry.type === "point") {
              return {
                ...light,
                geometry: { ...light.geometry, position: [x, light.geometry.position[1], z] },
              };
            }
            if (light.geometry.type === "vertical_column") {
              const nextFrom: [number, number, number] =
                part === "from"
                  ? [x, light.geometry.from[1], z]
                  : [x, light.geometry.from[1], light.geometry.from[2]];
              const nextTo: [number, number, number] =
                part === "to"
                  ? [x, light.geometry.to[1], z]
                  : [x, light.geometry.to[1], light.geometry.to[2]];
              return {
                ...light,
                geometry: { ...light.geometry, from: nextFrom, to: nextTo },
              };
            }
            if (light.geometry.type === "polyline" && typeof part === "number") {
              return {
                ...light,
                geometry: {
                  ...light.geometry,
                  points: light.geometry.points.map((pt, idx) =>
                    idx === part ? [x, pt[1], z] : pt,
                  ),
                },
              };
            }
            return light;
          }),
        }));
      },
      onMovePolygonVertex: (index, x, y) => {
        this._updateActiveRoom((room) => ({
          ...room,
          floor_polygon: room.floor_polygon.map((pt, idx) =>
            idx === index ? { x: Math.max(0, x), y: Math.max(0, y) } : pt,
          ),
        }));
      },
      onMoveFurnitureXY: (furnitureId, x, y) => {
        this._updateActiveRoom((room) => ({
          ...room,
          furniture: room.furniture.map((f) =>
            f.id === furnitureId ? { ...f, position: [x, y, f.position[2]] } : f,
          ),
        }));
      },
      onMoveCameraPov: (handle, x, y) => {
        this._updateActiveRoom((room) => ({
          ...room,
          camera_pov: {
            ...room.camera_pov,
            [handle]: [x, y, room.camera_pov[handle][2]],
          },
        }));
      },
      onCanvasTapXY: (x, y) => {
        if (this._editState.sketchPoints.length === 0) return;
        const prev = this._editState.sketchPoints[this._editState.sketchPoints.length - 1];
        const nextPt = this._editState.orthogonalSketch
          ? snapOrthogonalPoint(prev, { x, y }, 0.25)
          : { x: snapToGrid(Math.max(0, x), 0.25), y: snapToGrid(Math.max(0, y), 0.25) };
        if (nextPt.x === prev.x && nextPt.y === prev.y) return;
        this._editState = {
          ...this._editState,
          sketchPoints: [...this._editState.sketchPoints, nextPt],
        };
      },
    };
  }

  private _getSnapshotId(room: RoomConfig): string {
    return `hoas_preview_${slugifySceneId(room.id)}`;
  }

  private async _ensureSessionSnapshot(room: RoomConfig): Promise<void> {
    if (!this.hass || this._snapshotCreatedForRoom === room.id) return;
    try {
      await createRoomSnapshot(this.hass, room, this._getSnapshotId(room));
      this._snapshotCreatedForRoom = room.id;
    } catch {
      // Optionaler Komfort
    }
  }

  private async _applyIntentToSelection(
    room: RoomConfig,
    intent: LightIntent,
  ): Promise<void> {
    if (this._selectedIds.length === 0) {
      this._statusBanner = {
        kind: "warn",
        text: "Bitte zuerst mindestens eine Lichtquelle im Raum markieren.",
      };
      return;
    }

    if (intent.color) {
      this._activeColor = intent.color;
      this._recentColors = pushRecentColor(this._recentColors, intent.color);
      this._saveLocalPrefs();
    }

    const calibrations = this._config?.calibrations ?? {};
    const commands = this._selectedIds.map((entityId) => {
      const entity = this.hass?.states[entityId];
      return translateLightCommand(entityId, entity, intent, calibrations[entityId]);
    });

    const nextPreviews = new Map(this._previewOverrides);
    const nextPayloads = new Map(this._pendingPayloads);

    for (const cmd of commands) {
      if (cmd.status === "skipped_no_color" || !cmd.scenePayload) {
        continue;
      }
      nextPayloads.set(cmd.entityId, cmd.scenePayload);
      nextPreviews.set(cmd.entityId, {
        isOn: cmd.isOn,
        brightness01: cmd.previewBrightness01,
        rgb: cmd.previewRgb,
      });
    }

    this._previewOverrides = nextPreviews;
    this._pendingPayloads = nextPayloads;

    if (!this.hass) return;

    await this._ensureSessionSnapshot(room);
    try {
      const summary = await dispatchTranslatedCommands(this.hass, commands);
      if (summary.skipped.length > 0) {
        const names = summary.skipped.map((s) => s.friendlyName).join(", ");
        this._statusBanner = {
          kind: "warn",
          text: `${summary.skipped.length} Lampe(n) ohne Farbmodus übersprungen: ${names}`,
        };
      } else {
        this._statusBanner = undefined;
      }
    } catch (err) {
      this._statusBanner = {
        kind: "error",
        text: `Steuerung fehlgeschlagen: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }

  private _handleSwatchTap(room: RoomConfig, swatch: PaletteColor): void {
    void this._applyIntentToSelection(room, {
      action: "on",
      brightnessPct: this._brightnessPct,
      color: swatch,
    });
  }

  private _handleBrightnessInput(room: RoomConfig, event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this._brightnessPct = val;

    if (this._brightnessTimer) {
      clearTimeout(this._brightnessTimer);
    }
    this._brightnessTimer = setTimeout(() => {
      if (this._selectedIds.length > 0) {
        void this._applyIntentToSelection(room, {
          action: "on",
          brightnessPct: this._brightnessPct,
          color: this._activeColor,
        });
      }
    }, 160);
  }

  private _toggleFavorite(swatch: PaletteColor): void {
    this._favorites = toggleFavoriteColor(this._favorites, swatch);
    this._saveLocalPrefs();
    if (this._config) {
      this._commitConfig({ ...this._config, favorites: this._favorites });
    }
  }

  private async _openCalibrationWizard(room: RoomConfig): Promise<void> {
    if (room.lights.length === 0) return;
    await this._ensureSessionSnapshot(room);

    const refDefault =
      room.lights.find((l) =>
        this.hass?.states[l.entity_id]?.attributes.supported_color_modes?.includes("color_temp"),
      )?.entity_id ?? room.lights[0].entity_id;

    const targetDefault =
      (this._selectedIds[0] && this._selectedIds[0] !== refDefault
        ? this._selectedIds[0]
        : undefined) ??
      room.lights.find((l) => l.entity_id !== refDefault)?.entity_id ??
      room.lights[0].entity_id;

    const existingCal = this._config?.calibrations?.[targetDefault] ?? {};
    this._wizardState = {
      open: true,
      step: 1,
      referenceEntityId: refDefault,
      targetEntityId: targetDefault,
      testColor: CALIBRATION_TEST_ANCHORS[0],
      draft: { ...existingCal },
    };
  }

  private _handleWizardLivePreview(
    referenceEntityId: string,
    targetEntityId: string,
    color: PaletteColor,
    draft: EntityCalibration,
  ): void {
    const intent: LightIntent = {
      action: "on",
      brightnessPct: 80,
      color,
    };

    const refCmd = translateLightCommand(
      referenceEntityId,
      this.hass?.states[referenceEntityId],
      intent,
      undefined,
    );
    const targetCmd = translateLightCommand(
      targetEntityId,
      this.hass?.states[targetEntityId],
      intent,
      draft,
    );

    const nextPreviews = new Map(this._previewOverrides);
    for (const cmd of [refCmd, targetCmd]) {
      if (cmd.status === "applied") {
        nextPreviews.set(cmd.entityId, {
          isOn: cmd.isOn,
          brightness01: cmd.previewBrightness01,
          rgb: cmd.previewRgb,
        });
      }
    }
    this._previewOverrides = nextPreviews;

    if (!this.hass) return;
    if (this._wizardTimer) clearTimeout(this._wizardTimer);
    this._wizardTimer = setTimeout(() => {
      if (!this.hass) return;
      const cmds = referenceEntityId === targetEntityId ? [targetCmd] : [refCmd, targetCmd];
      void dispatchTranslatedCommands(this.hass, cmds, 0.25);
    }, 140);
  }

  private _saveCalibrationProfile(
    targetEntityId: string,
    calibration: EntityCalibration | undefined,
  ): void {
    if (!this._config) return;
    const nextCals = { ...(this._config.calibrations ?? {}) };
    if (calibration) {
      nextCals[targetEntityId] = calibration;
    } else {
      delete nextCals[targetEntityId];
    }
    this._commitConfig({ ...this._config, calibrations: nextCals });
    this._statusBanner = {
      kind: "ok",
      text: calibration
        ? `Kalibrierungsprofil für ${targetEntityId} gespeichert.`
        : `Kalibrierungsprofil für ${targetEntityId} auf Neutral zurückgesetzt.`,
    };
  }

  private _handleChipPointerDown(entityId: string): void {
    this._longPressTriggered = false;
    if (this._longPressTimer) clearTimeout(this._longPressTimer);
    this._longPressTimer = setTimeout(() => {
      this._longPressTriggered = true;
      this._multiSelectMode = true;
      if (!this._selectedIds.includes(entityId)) {
        this._selectedIds = [...this._selectedIds, entityId];
      }
    }, 450);
  }

  private _handleChipPointerUp(): void {
    if (this._longPressTimer) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = undefined;
    }
  }

  private async _handleRestoreSnapshot(room: RoomConfig): Promise<void> {
    if (!this.hass || this._snapshotCreatedForRoom !== room.id) return;
    try {
      await restoreRoomSnapshot(this.hass, this._getSnapshotId(room));
      this._previewOverrides = new Map();
      this._pendingPayloads = new Map();
      this._snapshotCreatedForRoom = undefined;
      this._statusBanner = {
        kind: "ok",
        text: "Ausgangszustand des Raums wiederhergestellt.",
      };
    } catch (err) {
      this._statusBanner = {
        kind: "error",
        text: `Zurücksetzen fehlgeschlagen: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }

  private _openSaveSceneModal(room: RoomConfig): void {
    this._sceneMode = "new";
    this._sceneName = `${room.name} – Ambiente`;
    const existingScenes = this._getExistingScenes();
    this._sceneTargetId = existingScenes[0]?.id ?? "";
    this._sceneModalOpen = true;
  }

  private _getExistingScenes(): Array<{ id: string; entityId: string; name: string }> {
    if (!this.hass) return [];
    return Object.values(this.hass.states)
      .filter((st) => st.entity_id.startsWith("scene.") && !st.entity_id.startsWith("scene.hoas_preview_"))
      .map((st) => ({
        id: st.entity_id.replace(/^scene\./, ""),
        entityId: st.entity_id,
        name: st.attributes.friendly_name ?? st.entity_id,
      }));
  }

  private async _submitSaveScene(room: RoomConfig): Promise<void> {
    if (!this.hass) return;
    const visualStates = this._buildVisualStates(room);
    const entities = buildRoomSceneEntities(room, this.hass, this._pendingPayloads, visualStates);
    const sceneId =
      this._sceneMode === "overwrite" && this._sceneTargetId
        ? this._sceneTargetId
        : slugifySceneId(this._sceneName);
    const sceneName =
      this._sceneMode === "overwrite" && this._sceneTargetId
        ? (this._getExistingScenes().find((s) => s.id === this._sceneTargetId)?.name ??
          this._sceneTargetId)
        : this._sceneName.trim() || `${room.name} Szene`;

    this._sceneSaving = true;
    try {
      await saveRoomScene(this.hass, {
        sceneId,
        name: sceneName,
        icon: "mdi:lightbulb-group",
        entities,
      });
      this._sceneModalOpen = false;
      this._statusBanner = {
        kind: "ok",
        text: `Szene "${sceneName}" gespeichert (${Object.keys(entities).length} Raum-Lampen inkl. Aus-Status).`,
      };
    } catch (err) {
      this._statusBanner = {
        kind: "error",
        text: `Szene konnte nicht gespeichert werden: ${err instanceof Error ? err.message : String(err)}`,
      };
    } finally {
      this._sceneSaving = false;
    }
  }

  private _renderBanner() {
    if (!this._statusBanner) return nothing;
    return html`
      <div class="banner ${this._statusBanner.kind}" style="margin:0 12px 10px">
        <span>${this._statusBanner.text}</span>
        <button
          type="button"
          class="mini-tab"
          @click=${() => (this._statusBanner = undefined)}
        >
          ×
        </button>
      </div>
    `;
  }

  private _renderControlDock(room: RoomConfig) {
    const selectedCount = this._selectedIds.length;
    const isFav = this._activeColor
      ? this._favorites.some((f) => f.id === this._activeColor?.id)
      : false;

    return html`
      <div class="control-dock">
        <div class="control-header">
          <span class="control-title">
            ${selectedCount > 0
              ? `${selectedCount} Lichtquelle(n) gewählt`
              : "Lichtquelle(n) oben markieren"}
          </span>
          <div class="control-actions">
            <button
              type="button"
              class="action-btn"
              ?disabled=${selectedCount === 0}
              @click=${() =>
                void this._applyIntentToSelection(room, {
                  action: "on",
                  brightnessPct: this._brightnessPct,
                  color: this._activeColor,
                })}
            >
              An
            </button>
            <button
              type="button"
              class="action-btn danger"
              ?disabled=${selectedCount === 0}
              @click=${() => void this._applyIntentToSelection(room, { action: "off" })}
            >
              Aus
            </button>
            ${this._snapshotCreatedForRoom === room.id
              ? html`
                  <button
                    type="button"
                    class="action-btn"
                    @click=${() => void this._handleRestoreSnapshot(room)}
                  >
                    Zurücksetzen
                  </button>
                `
              : nothing}
            <button
              type="button"
              class="action-btn primary"
              @click=${() => this._openSaveSceneModal(room)}
            >
              Als HA-Szene speichern
            </button>
          </div>
        </div>

        <div class="brightness-row">
          <span>Helligkeit</span>
          <input
            type="range"
            min="1"
            max="100"
            .value=${String(this._brightnessPct)}
            @input=${(e: Event) => this._handleBrightnessInput(room, e)}
            aria-label="Helligkeit"
          />
          <strong>${this._brightnessPct}%</strong>
        </div>

        ${this._favorites.length > 0
          ? html`
              <div class="palette-section">
                <div class="palette-label">
                  <span>Favoriten</span>
                  ${this._activeColor
                    ? html`
                        <button
                          type="button"
                          class="mini-tab ${isFav ? "active" : ""}"
                          @click=${() => this._activeColor && this._toggleFavorite(this._activeColor)}
                        >
                          ${isFav ? "★ Favorit" : "☆ Als Favorit"}
                        </button>
                      `
                    : nothing}
                </div>
                <div class="swatch-row">
                  ${this._favorites.map(
                    (swatch) => html`
                      <button
                        type="button"
                        class="swatch ${this._activeColor?.id === swatch.id ? "active" : ""}"
                        style="background:${swatch.hex}"
                        title=${swatch.label}
                        aria-label=${swatch.label}
                        @click=${() => this._handleSwatchTap(room, swatch)}
                      ></button>
                    `,
                  )}
                </div>
              </div>
            `
          : nothing}

        ${this._recentColors.length > 0
          ? html`
              <div class="palette-section">
                <div class="palette-label"><span>Zuletzt verwendet</span></div>
                <div class="swatch-row">
                  ${this._recentColors.map(
                    (swatch) => html`
                      <button
                        type="button"
                        class="swatch ${this._activeColor?.id === swatch.id ? "active" : ""}"
                        style="background:${swatch.hex}"
                        title=${swatch.label}
                        aria-label=${swatch.label}
                        @click=${() => this._handleSwatchTap(room, swatch)}
                      ></button>
                    `,
                  )}
                </div>
              </div>
            `
          : nothing}

        <div class="palette-section">
          <div class="palette-label"><span>Weißtöne (Kelvin)</span></div>
          <div class="swatch-row">
            ${WHITE_PALETTE.map(
              (swatch) => html`
                <button
                  type="button"
                  class="swatch-white ${this._activeColor?.id === swatch.id ? "active" : ""}"
                  title=${swatch.label}
                  @click=${() => this._handleSwatchTap(room, swatch)}
                >
                  <span class="dot" style="background:${swatch.hex}"></span>
                  <span>${swatch.kelvin}K</span>
                </button>
              `,
            )}
          </div>
        </div>

        <div class="palette-section">
          <div class="palette-label"><span>Master-Farbkarte</span></div>
          <div class="swatch-grid">
            ${COLOR_PALETTE.map(
              (swatch) => html`
                <button
                  type="button"
                  class="swatch ${this._activeColor?.id === swatch.id ? "active" : ""}"
                  style="background:${swatch.hex}"
                  title=${swatch.label}
                  aria-label=${swatch.label}
                  @click=${() => this._handleSwatchTap(room, swatch)}
                ></button>
              `,
            )}
          </div>
        </div>
      </div>
    `;
  }

  private _renderSceneModal(room: RoomConfig) {
    if (!this._sceneModalOpen) return nothing;
    const existingScenes = this._getExistingScenes();

    return html`
      <div class="modal-backdrop" @click=${() => (this._sceneModalOpen = false)}>
        <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
          <h3>HA-Szene speichern · ${room.name}</h3>
          <div class="subview-tabs">
            <button
              type="button"
              class="mini-tab ${this._sceneMode === "new" ? "active" : ""}"
              @click=${() => (this._sceneMode = "new")}
            >
              Neue Szene
            </button>
            <button
              type="button"
              class="mini-tab ${this._sceneMode === "overwrite" ? "active" : ""}"
              ?disabled=${existingScenes.length === 0}
              @click=${() => (this._sceneMode = "overwrite")}
            >
              Bestehende überschreiben
            </button>
          </div>

          ${this._sceneMode === "new"
            ? html`
                <label>
                  Szenen-Name
                  <input
                    type="text"
                    .value=${this._sceneName}
                    @input=${(e: Event) =>
                      (this._sceneName = (e.target as HTMLInputElement).value)}
                  />
                </label>
              `
            : html`
                <label>
                  Ziel-Szene auswählen
                  <select
                    .value=${this._sceneTargetId}
                    @change=${(e: Event) =>
                      (this._sceneTargetId = (e.target as HTMLSelectElement).value)}
                  >
                    ${existingScenes.map(
                      (s) => html`<option value=${s.id}>${s.name} (${s.entityId})</option>`,
                    )}
                  </select>
                </label>
              `}

          <div class="modes-badge">
            Es werden alle ${room.lights.length} Lampen des Raums gespeichert (inkl. ausgeschalteter
            Lampen als "off").
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="action-btn"
              @click=${() => (this._sceneModalOpen = false)}
            >
              Abbrechen
            </button>
            <button
              type="button"
              class="action-btn primary"
              ?disabled=${this._sceneSaving}
              @click=${() => void this._submitSaveScene(room)}
            >
              ${this._sceneSaving ? "Speichere…" : "Szene speichern"}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  protected override render() {
    if (!this._config) {
      return html`<ha-card><div class="empty-state">Warte auf Konfiguration…</div></ha-card>`;
    }

    const activeRoom = this._getActiveRoom();
    if (!activeRoom) {
      return html`
        <ha-card>
          <div class="empty-state">
            Noch kein Raum konfiguriert. Öffne den Edit-Mode, um einen Raum anzulegen.
          </div>
        </ha-card>
      `;
    }

    const visualStates = this._buildVisualStates(activeRoom);
    const selectedSet = new Set(this._selectedIds);
    const groupTags = Array.from(
      new Set(activeRoom.lights.map((l) => l.group_tag).filter((t): t is string => Boolean(t))),
    );
    const editHandlers = this._buildEditHandlers();

    return html`
      <ha-card>
        <div class="header">
          <div class="room-tabs" role="tablist" aria-label="Räume">
            ${this._config.rooms.map(
              (room) => html`
                <button
                  type="button"
                  role="tab"
                  aria-selected=${room.id === activeRoom.id}
                  class="room-tab ${room.id === activeRoom.id ? "active" : ""}"
                  @click=${() => this._selectRoom(room.id)}
                >
                  ${room.name}
                </button>
              `,
            )}
          </div>
          <div class="header-actions">
            ${!this._editUnlocked
              ? html`
                  <button
                    type="button"
                    class="pill-btn ${this._multiSelectMode ? "active" : ""}"
                    @click=${() => (this._multiSelectMode = !this._multiSelectMode)}
                    aria-pressed=${this._multiSelectMode}
                  >
                    + Mehrfach
                  </button>
                  ${activeRoom.lights.length > 0
                    ? html`
                        <button
                          type="button"
                          class="pill-btn"
                          @click=${() => void this._openCalibrationWizard(activeRoom)}
                        >
                          Abgleich
                        </button>
                      `
                    : nothing}
                `
              : nothing}
            <button
              type="button"
              class="pill-btn ${this._editUnlocked ? "unlocked" : ""}"
              @click=${this._toggleEditLock}
              aria-pressed=${this._editUnlocked}
            >
              ${this._editUnlocked ? "Edit-Mode: Offen" : "Gesperrt"}
            </button>
          </div>
        </div>

        <div class="split-layout">
          <div class="panel">
            <div class="panel-title">
              <span>3D-Ansicht · ${activeRoom.name}</span>
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab ${this._cameraPreset === "pov" ? "active" : ""}"
                  @click=${() => this._setCameraPreset("pov")}
                >
                  Couch-POV
                </button>
                <button
                  type="button"
                  class="mini-tab ${this._cameraPreset === "orbit" ? "active" : ""}"
                  @click=${() => this._setCameraPreset("orbit")}
                >
                  360° Orbit
                </button>
              </div>
            </div>
            <div class="stage-3d">
              ${this._webglUnavailable
                ? html`<div class="stage-fallback">WebGL nicht verfügbar – 2D-Ansichten aktiv</div>`
                : nothing}
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">
              <span>
                ${this._secondaryView === "top"
                  ? "2D-Draufsicht (X/Y)"
                  : "Frontalansicht (X/Z Höhe)"}
              </span>
              <div class="subview-tabs">
                <button
                  type="button"
                  class="mini-tab ${this._secondaryView === "top" ? "active" : ""}"
                  @click=${() => (this._secondaryView = "top")}
                >
                  Drauf
                </button>
                <button
                  type="button"
                  class="mini-tab ${this._secondaryView === "front" ? "active" : ""}"
                  @click=${() => (this._secondaryView = "front")}
                >
                  Frontal
                </button>
              </div>
            </div>
            <div class="stage-2d ${this._editUnlocked ? "editing" : ""}">
              ${this._secondaryView === "top"
                ? renderTopDownSvg(activeRoom, {
                    selectedIds: selectedSet,
                    visualStates,
                    onSelectLight: (id, add) => this._handleLightSelection(id, add),
                    edit: editHandlers,
                  })
                : renderFrontSvg(activeRoom, {
                    selectedIds: selectedSet,
                    visualStates,
                    onSelectLight: (id, add) => this._handleLightSelection(id, add),
                    edit: editHandlers,
                  })}
            </div>
          </div>
        </div>

        ${!this._editUnlocked
          ? html`
              <div class="quick-bar">
                <button
                  type="button"
                  class="quick-chip"
                  @click=${() => this._selectAllLights(activeRoom)}
                >
                  Alle (${activeRoom.lights.length})
                </button>
                ${groupTags.map(
                  (tag) => html`
                    <button
                      type="button"
                      class="quick-chip"
                      @click=${() => this._selectByGroupTag(activeRoom, tag)}
                    >
                      ${tag}
                    </button>
                  `,
                )}
                ${this._selectedIds.length > 0
                  ? html`
                      <button type="button" class="quick-chip active" @click=${this._clearSelection}>
                        Auswahl (${this._selectedIds.length}) ×
                      </button>
                    `
                  : nothing}
              </div>

              <div class="lights-strip">
                ${activeRoom.lights.map((light) => {
                  const entity = this.hass?.states[light.entity_id];
                  const visual = visualStates.get(light.entity_id);
                  const modes = entity?.attributes.supported_color_modes?.join(", ") ?? "unbekannt";
                  const label = light.label ?? entity?.attributes.friendly_name ?? light.entity_id;
                  const isSelected = selectedSet.has(light.entity_id);
                  const pct = visual?.isOn
                    ? ` · ${Math.round(visual.brightness01 * 100)}%`
                    : " · Aus";
                  return html`
                    <button
                      type="button"
                      class="light-chip ${isSelected ? "selected" : ""}"
                      @pointerdown=${() => this._handleChipPointerDown(light.entity_id)}
                      @pointerup=${() => this._handleChipPointerUp()}
                      @pointercancel=${() => this._handleChipPointerUp()}
                      @click=${(e: MouseEvent) => {
                        if (this._longPressTriggered) {
                          this._longPressTriggered = false;
                          return;
                        }
                        this._handleLightSelection(
                          light.entity_id,
                          e.shiftKey || e.ctrlKey || e.metaKey,
                        );
                      }}
                    >
                      <span
                        class="light-dot"
                        style="background:${visual?.cssColor ?? "#52525b"}"
                      ></span>
                      <span>${label}${pct}</span>
                      <span class="modes-badge">[${modes}]</span>
                    </button>
                  `;
                })}
              </div>

              ${this._renderControlDock(activeRoom)}
            `
          : renderEditPanel(this._config, activeRoom, this.hass, this._editState, {
              onSelectTab: (tab, tool) => {
                this._editState = { ...this._editState, activeTab: tab, editTool: tool };
              },
              onUpdateConfig: (nextCfg, nextRoomId) => this._commitConfig(nextCfg, nextRoomId),
              onUpdateRoom: (updater) => this._updateActiveRoom(updater),
              onSetState: (patch) => {
                this._editState = { ...this._editState, ...patch };
              },
              onNotify: (kind, text) => {
                this._statusBanner = { kind, text };
              },
            })}
        ${this._renderBanner()} ${this._renderSceneModal(activeRoom)}
        ${renderCalibrationWizard(activeRoom, this.hass, this._wizardState, {
          onClose: (restore) => {
            this._wizardState = { ...this._wizardState, open: false };
            if (restore && this._snapshotCreatedForRoom === activeRoom.id) {
              void this._handleRestoreSnapshot(activeRoom);
            }
          },
          onChangeState: (patch) => {
            const nextState = { ...this._wizardState, ...patch };
            if (patch.targetEntityId && patch.targetEntityId !== this._wizardState.targetEntityId) {
              nextState.draft = { ...(this._config?.calibrations?.[patch.targetEntityId] ?? {}) };
            }
            this._wizardState = nextState;
          },
          onLivePreview: (refId, tgtId, color, draft) =>
            this._handleWizardLivePreview(refId, tgtId, color, draft),
          onSaveProfile: (targetId, cal) => this._saveCalibrationProfile(targetId, cal),
        })}
      </ha-card>
    `;
  }
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "hoas-light-widget")) {
  window.customCards.push({
    type: "hoas-light-widget",
    name: "HOAS LightWidget",
    description: "3D/2D Raum-Visualisierung und einheitliche Ambiente-Lichtsteuerung",
    preview: true,
  });
}
