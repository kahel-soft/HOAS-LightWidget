import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HoasLightWidgetConfig, HomeAssistant } from "./types/config";
import { createStubConfig, normalizeConfig } from "./utils/config";
import { cardStyles } from "./styles/card-styles";

@customElement("hoas-light-widget-editor")
export class HoasLightWidgetEditor extends LitElement {
  public static override styles = cardStyles;

  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config: HoasLightWidgetConfig = createStubConfig();

  @state()
  private _jsonDraft = "";

  @state()
  private _error?: string;

  public setConfig(config: Partial<HoasLightWidgetConfig>): void {
    this._config = normalizeConfig(config);
    this._jsonDraft = JSON.stringify(this._config, null, 2);
    this._error = undefined;
  }

  private _emitConfigChanged(next: HoasLightWidgetConfig): void {
    this._config = next;
    this._jsonDraft = JSON.stringify(next, null, 2);
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _applyJsonDraft(): void {
    try {
      const parsed = JSON.parse(this._jsonDraft);
      const normalized = normalizeConfig(parsed);
      this._error = undefined;
      this._emitConfigChanged(normalized);
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  protected override render() {
    return html`
      <div class="edit-panel">
        <div class="control-header">
          <span class="control-title">HOAS LightWidget · Karten-Konfiguration</span>
          <button type="button" class="action-btn primary" @click=${this._applyJsonDraft}>
            Übernehmen
          </button>
        </div>
        <div class="modes-badge">
          Tipp: Öffne auf der Karte selbst das Schloss ("Gesperrt" → "Edit-Mode: Offen"), um
          Grundriss, Möbel und Lampen direkt per Drag &amp; Drop in 2D zu zeichnen und danach als
          JSON hier einzufügen.
        </div>
        <textarea
          rows="14"
          .value=${this._jsonDraft}
          @input=${(e: Event) =>
            (this._jsonDraft = (e.target as HTMLTextAreaElement).value)}
        ></textarea>
        ${this._error
          ? html`<div class="banner error"><span>Fehler: ${this._error}</span></div>`
          : html``}
      </div>
    `;
  }
}
