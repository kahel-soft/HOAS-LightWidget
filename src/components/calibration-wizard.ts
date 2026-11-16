import { html, nothing } from "lit";
import type {
  EntityCalibration,
  HomeAssistant,
  PaletteColor,
  RoomConfig,
} from "../types/config";
import { COLOR_PALETTE, WHITE_PALETTE } from "../utils/palette";

export interface CalibrationWizardState {
  open: boolean;
  step: 1 | 2;
  referenceEntityId: string;
  targetEntityId: string;
  testColor: PaletteColor;
  draft: EntityCalibration;
}

export interface CalibrationWizardCallbacks {
  onClose: (restoreSnapshot: boolean) => void;
  onChangeState: (patch: Partial<CalibrationWizardState>) => void;
  onLivePreview: (
    referenceEntityId: string,
    targetEntityId: string,
    color: PaletteColor,
    draft: EntityCalibration,
  ) => void;
  onSaveProfile: (targetEntityId: string, calibration: EntityCalibration | undefined) => void;
}

export const CALIBRATION_TEST_ANCHORS: PaletteColor[] = [
  WHITE_PALETTE[2], // 2700K Warm
  COLOR_PALETTE[2], // Bernstein
  COLOR_PALETTE[17], // Himmelblau
  COLOR_PALETTE[13], // Amethyst
];

export function isNeutralCalibration(cal: EntityCalibration): boolean {
  const hue = cal.hue_offset_deg ?? 0;
  const sat = cal.saturation_scale ?? 1;
  const bri = cal.brightness_scale ?? 1;
  return (
    hue === 0 &&
    Math.abs(sat - 1) < 0.001 &&
    Math.abs(bri - 1) < 0.001 &&
    cal.warm_white_hue_deg === undefined &&
    cal.warm_white_saturation_pct === undefined
  );
}

export function sanitizeCalibration(cal: EntityCalibration): EntityCalibration | undefined {
  if (isNeutralCalibration(cal)) {
    return undefined;
  }
  const out: EntityCalibration = {};
  if (cal.hue_offset_deg) out.hue_offset_deg = cal.hue_offset_deg;
  if (cal.saturation_scale !== undefined && Math.abs(cal.saturation_scale - 1) >= 0.001) {
    out.saturation_scale = Math.round(cal.saturation_scale * 100) / 100;
  }
  if (cal.brightness_scale !== undefined && Math.abs(cal.brightness_scale - 1) >= 0.001) {
    out.brightness_scale = Math.round(cal.brightness_scale * 100) / 100;
  }
  if (cal.warm_white_hue_deg !== undefined) {
    out.warm_white_hue_deg = cal.warm_white_hue_deg;
  }
  if (cal.warm_white_saturation_pct !== undefined) {
    out.warm_white_saturation_pct = cal.warm_white_saturation_pct;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export function renderCalibrationWizard(
  room: RoomConfig,
  hass: HomeAssistant | undefined,
  state: CalibrationWizardState,
  cb: CalibrationWizardCallbacks,
) {
  if (!state.open) return nothing;

  const lights = room.lights;
  const targetEntity = hass?.states[state.targetEntityId];
  const targetModes = targetEntity?.attributes.supported_color_modes ?? [];
  const targetNeedsWarmHs = targetModes.includes("hs") && !targetModes.includes("color_temp");

  const getLabel = (entityId: string) =>
    lights.find((l) => l.entity_id === entityId)?.label ??
    hass?.states[entityId]?.attributes.friendly_name ??
    entityId;

  const updateDraft = (patch: Partial<EntityCalibration>) => {
    const next = { ...state.draft, ...patch };
    cb.onChangeState({ draft: next });
    cb.onLivePreview(state.referenceEntityId, state.targetEntityId, state.testColor, next);
  };

  return html`
    <div class="modal-backdrop" @click=${() => cb.onClose(true)}>
      <div class="modal wizard-modal" @click=${(e: Event) => e.stopPropagation()}>
        <div class="control-header">
          <h3>Farb-Abgleich-Assistent · ${room.name}</h3>
          <span class="modes-badge">Schritt ${state.step} / 2</span>
        </div>

        ${state.step === 1
          ? html`
              <div class="modes-badge">
                Wähle eine <strong>Referenzlampe</strong> (z. B. Hue) und die{" "}
                <strong>Ziellampe</strong>, deren Farbton und Helligkeit optisch angeglichen werden
                sollen.
              </div>
              <label>
                Referenzlampe (Soll-Farbton)
                <select
                  .value=${state.referenceEntityId}
                  @change=${(e: Event) =>
                    cb.onChangeState({
                      referenceEntityId: (e.target as HTMLSelectElement).value,
                    })}
                >
                  ${lights.map(
                    (l) => html`<option value=${l.entity_id}>${getLabel(l.entity_id)}</option>`,
                  )}
                </select>
              </label>

              <label>
                Ziellampe (wird kalibriert)
                <select
                  .value=${state.targetEntityId}
                  @change=${(e: Event) =>
                    cb.onChangeState({
                      targetEntityId: (e.target as HTMLSelectElement).value,
                    })}
                >
                  ${lights.map(
                    (l) => html`<option value=${l.entity_id}>${getLabel(l.entity_id)}</option>`,
                  )}
                </select>
              </label>

              <div class="modal-footer">
                <button type="button" class="action-btn" @click=${() => cb.onClose(true)}>
                  Abbrechen
                </button>
                <button
                  type="button"
                  class="action-btn primary"
                  ?disabled=${!state.targetEntityId}
                  @click=${() => {
                    cb.onChangeState({ step: 2 });
                    cb.onLivePreview(
                      state.referenceEntityId,
                      state.targetEntityId,
                      state.testColor,
                      state.draft,
                    );
                  }}
                >
                  Weiter &amp; Live testen
                </button>
              </div>
            `
          : html`
              <div class="modes-badge">
                Referenz: <strong>${getLabel(state.referenceEntityId)}</strong> → Ziel:{" "}
                <strong>${getLabel(state.targetEntityId)}</strong>
              </div>

              <div class="palette-section">
                <div class="palette-label"><span>1. Testfarbe live an beide senden</span></div>
                <div class="swatch-row">
                  ${CALIBRATION_TEST_ANCHORS.map(
                    (anchor) => html`
                      <button
                        type="button"
                        class="mini-tab ${state.testColor.id === anchor.id ? "active" : ""}"
                        @click=${() => {
                          cb.onChangeState({ testColor: anchor });
                          cb.onLivePreview(
                            state.referenceEntityId,
                            state.targetEntityId,
                            anchor,
                            state.draft,
                          );
                        }}
                      >
                        <span
                          class="light-dot"
                          style="display:inline-block;width:8px;height:8px;margin-right:4px;background:${anchor.hex}"
                        ></span>
                        ${anchor.label}
                      </button>
                    `,
                  )}
                </div>
              </div>

              <div class="wizard-sliders">
                <label>
                  Farbton-Verschiebung: ${state.draft.hue_offset_deg ?? 0}°
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    step="1"
                    .value=${String(state.draft.hue_offset_deg ?? 0)}
                    @input=${(e: Event) =>
                      updateDraft({ hue_offset_deg: Number((e.target as HTMLInputElement).value) })}
                  />
                </label>

                <label>
                  Sättigungs-Faktor: ${Math.round((state.draft.saturation_scale ?? 1) * 100)}%
                  <input
                    type="range"
                    min="50"
                    max="150"
                    step="2"
                    .value=${String(Math.round((state.draft.saturation_scale ?? 1) * 100))}
                    @input=${(e: Event) =>
                      updateDraft({
                        saturation_scale: Number((e.target as HTMLInputElement).value) / 100,
                      })}
                  />
                </label>

                <label>
                  Helligkeits-Faktor: ${Math.round((state.draft.brightness_scale ?? 1) * 100)}%
                  <input
                    type="range"
                    min="40"
                    max="150"
                    step="2"
                    .value=${String(Math.round((state.draft.brightness_scale ?? 1) * 100))}
                    @input=${(e: Event) =>
                      updateDraft({
                        brightness_scale: Number((e.target as HTMLInputElement).value) / 100,
                      })}
                  />
                </label>

                ${targetNeedsWarmHs
                  ? html`
                      <label>
                        Warmweiß-Farbton (ohne Kelvin):{" "}
                        ${state.draft.warm_white_hue_deg ?? 30}°
                        <input
                          type="range"
                          min="15"
                          max="55"
                          step="1"
                          .value=${String(state.draft.warm_white_hue_deg ?? 30)}
                          @input=${(e: Event) =>
                            updateDraft({
                              warm_white_hue_deg: Number((e.target as HTMLInputElement).value),
                            })}
                        />
                      </label>
                      <label>
                        Warmweiß-Sättigung:{" "}
                        ${state.draft.warm_white_saturation_pct ?? 55}%
                        <input
                          type="range"
                          min="10"
                          max="85"
                          step="1"
                          .value=${String(state.draft.warm_white_saturation_pct ?? 55)}
                          @input=${(e: Event) =>
                            updateDraft({
                              warm_white_saturation_pct: Number(
                                (e.target as HTMLInputElement).value,
                              ),
                            })}
                        />
                      </label>
                    `
                  : nothing}
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="action-btn"
                  @click=${() => cb.onChangeState({ step: 1 })}
                >
                  Zurück
                </button>
                <button
                  type="button"
                  class="action-btn"
                  @click=${() => {
                    const neutral: EntityCalibration = {};
                    cb.onChangeState({ draft: neutral });
                    cb.onLivePreview(
                      state.referenceEntityId,
                      state.targetEntityId,
                      state.testColor,
                      neutral,
                    );
                  }}
                >
                  Reset (0)
                </button>
                <button
                  type="button"
                  class="action-btn primary"
                  @click=${() => {
                    cb.onSaveProfile(state.targetEntityId, sanitizeCalibration(state.draft));
                    cb.onClose(false);
                  }}
                >
                  Profil speichern
                </button>
              </div>
            `}
      </div>
    </div>
  `;
}
