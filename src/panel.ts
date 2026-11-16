import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HoasLightWidgetConfig, HomeAssistant } from "./types/config";
import { createStubConfig, normalizeConfig } from "./utils/config";
import type { HoasLightWidget } from "./hoas-light-widget";

@customElement("hoas-light-panel")
export class HoasLightPanel extends LitElement {
  public static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100vh;
      box-sizing: border-box;
      background: var(--primary-background-color, #111318);
      color: var(--primary-text-color, #f2f2f7);
    }

    .panel-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      height: var(--header-height, 56px);
      padding: 0 16px 0 8px;
      background: var(--app-header-background-color, var(--card-background-color, #1c1c1e));
      color: var(--app-header-text-color, var(--primary-text-color, #f2f2f7));
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      box-sizing: border-box;
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .topbar-title {
      font-size: 1.1rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sync-badge {
      font-size: 0.76rem;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.14));
      color: var(--secondary-text-color, #a1a1aa);
      white-space: nowrap;
    }

    .sync-badge.saving {
      color: #f59e0b;
      border-color: rgba(245, 158, 11, 0.45);
    }

    .sync-badge.error {
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.45);
    }

    .panel-body {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    hoas-light-widget {
      flex: 1;
      width: 100%;
    }
  `;

  @property({ attribute: false })
  public hass?: HomeAssistant;

  @property({ type: Boolean })
  public narrow = false;

  @property({ attribute: false })
  public panel?: { title?: string; config?: Partial<HoasLightWidgetConfig> };

  @state()
  private _loadedConfig?: HoasLightWidgetConfig;

  @state()
  private _syncStatus: "loading" | "ready" | "saving" | "error" = "loading";

  private _hasLoadedFromServer = false;
  private _saveTimer?: ReturnType<typeof setTimeout>;

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._saveTimer) clearTimeout(this._saveTimer);
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has("hass") && this.hass && !this._hasLoadedFromServer) {
      this._hasLoadedFromServer = true;
      void this._loadServerConfig();
    }

    const widget = this.renderRoot.querySelector<HoasLightWidget>("hoas-light-widget");
    if (widget && this._loadedConfig && changedProperties.has("_loadedConfig")) {
      widget.setConfig(this._loadedConfig);
    }
  }

  private async _loadServerConfig(): Promise<void> {
    if (!this.hass?.callWS) {
      this._loadedConfig = createStubConfig();
      this._syncStatus = "ready";
      return;
    }

    try {
      const resp = await this.hass.callWS<{ config?: Partial<HoasLightWidgetConfig> | null }>({
        type: "hoas_light_widget/get_config",
      });
      if (resp?.config && Array.isArray(resp.config.rooms) && resp.config.rooms.length > 0) {
        this._loadedConfig = normalizeConfig(resp.config);
      } else {
        this._loadedConfig = createStubConfig();
      }
      this._syncStatus = "ready";
    } catch {
      this._loadedConfig = createStubConfig();
      this._syncStatus = "error";
    }
  }

  private _handleConfigChanged(event: CustomEvent<{ config: HoasLightWidgetConfig }>): void {
    const nextConfig = event.detail?.config;
    if (!nextConfig) return;

    this._loadedConfig = nextConfig;
    if (!this.hass?.callWS) return;

    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._syncStatus = "saving";
    this._saveTimer = setTimeout(async () => {
      try {
        await this.hass?.callWS?.({
          type: "hoas_light_widget/save_config",
          config: nextConfig,
        });
        this._syncStatus = "ready";
      } catch {
        this._syncStatus = "error";
      }
    }, 350);
  }

  protected override render() {
    const title = this.panel?.title ?? "Licht-Studio";
    const statusText =
      this._syncStatus === "loading"
        ? "Lade…"
        : this._syncStatus === "saving"
          ? "Speichere…"
          : this._syncStatus === "error"
            ? "Offline / Lokal"
            : "Auf HA gespeichert";

    return html`
      <div class="panel-topbar">
        <div class="topbar-left">
          <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
          <span class="topbar-title">${title}</span>
        </div>
        <span class="sync-badge ${this._syncStatus}">${statusText}</span>
      </div>
      <div class="panel-body">
        <hoas-light-widget
          fullwidth
          .hass=${this.hass}
          @config-changed=${this._handleConfigChanged}
        ></hoas-light-widget>
      </div>
    `;
  }
}
