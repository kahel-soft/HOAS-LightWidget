import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    --hlw-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
    --hlw-surface: var(--secondary-background-color, #262629);
    --hlw-text: var(--primary-text-color, #f2f2f7);
    --hlw-muted: var(--secondary-text-color, #a1a1aa);
    --hlw-accent: var(--primary-color, #03a9f4);
    --hlw-selected: #38bdf8;
    --hlw-border: var(--divider-color, rgba(255, 255, 255, 0.12));
    --hlw-radius: var(--ha-card-border-radius, 12px);
  }

  ha-card {
    background: var(--hlw-bg);
    color: var(--hlw-text);
    border-radius: var(--hlw-radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid var(--hlw-border);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--hlw-border);
    flex-wrap: wrap;
  }

  .room-tabs {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .room-tab {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: transparent;
    color: var(--hlw-muted);
    border-radius: 999px;
    padding: 5px 12px;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
  }

  .room-tab.active {
    background: var(--hlw-accent);
    border-color: var(--hlw-accent);
    color: #fff;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pill-btn {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: var(--hlw-surface);
    color: var(--hlw-text);
    border-radius: 999px;
    padding: 5px 10px;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
  }

  .pill-btn.active {
    background: rgba(56, 189, 248, 0.18);
    border-color: var(--hlw-selected);
    color: var(--hlw-selected);
  }

  .pill-btn.unlocked {
    border-color: #f59e0b;
    color: #f59e0b;
  }

  .split-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px 12px;
  }

  @media (min-width: 820px) {
    .split-layout {
      grid-template-columns: 1.35fr 1fr;
      align-items: stretch;
    }
  }

  .panel {
    background: var(--hlw-surface);
    border: 1px solid var(--hlw-border);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .panel-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 10px;
    font-size: 0.76rem;
    color: var(--hlw-muted);
    border-bottom: 1px solid var(--hlw-border);
  }

  .stage-3d {
    position: relative;
    width: 100%;
    height: 235px;
    background: #0f1218;
    touch-action: none;
  }

  @media (min-width: 820px) {
    .stage-3d {
      height: 310px;
    }
  }

  .stage-3d canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .stage-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    text-align: center;
    font-size: 0.82rem;
    color: var(--hlw-muted);
  }

  .subview-tabs {
    display: inline-flex;
    gap: 4px;
  }

  .mini-tab {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: transparent;
    color: var(--hlw-muted);
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.72rem;
    cursor: pointer;
  }

  .mini-tab.active {
    background: var(--hlw-accent);
    border-color: var(--hlw-accent);
    color: #fff;
  }

  .stage-2d {
    padding: 10px;
    min-height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .stage-2d svg {
    width: 100%;
    max-height: 210px;
    user-select: none;
  }

  .stage-2d.editing svg {
    touch-action: none;
  }

  .svg-light {
    cursor: pointer;
  }

  .quick-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 12px 8px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .quick-chip {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: transparent;
    color: var(--hlw-muted);
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.74rem;
    cursor: pointer;
    white-space: nowrap;
  }

  .quick-chip.active {
    background: rgba(56, 189, 248, 0.16);
    border-color: var(--hlw-selected);
    color: var(--hlw-text);
  }

  .lights-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 12px 10px;
  }

  .light-chip {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid var(--hlw-border);
    background: var(--hlw-surface);
    font-size: 0.76rem;
    color: var(--hlw-text);
    cursor: pointer;
  }

  .light-chip.selected {
    border-color: var(--hlw-selected);
    box-shadow: 0 0 0 1px var(--hlw-selected);
  }

  .light-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #52525b;
    border: 1px solid rgba(255, 255, 255, 0.25);
  }

  .modes-badge {
    font-size: 0.68rem;
    color: var(--hlw-muted);
  }

  .control-dock {
    margin: 2px 12px 12px;
    padding: 10px;
    border-radius: 10px;
    background: var(--hlw-surface);
    border: 1px solid var(--hlw-border);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .control-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .control-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--hlw-text);
  }

  .control-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .action-btn {
    appearance: none;
    border: 1px solid var(--hlw-border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--hlw-text);
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 0.76rem;
    font-weight: 500;
    cursor: pointer;
  }

  .action-btn.primary {
    background: var(--hlw-accent);
    border-color: var(--hlw-accent);
    color: #fff;
  }

  .action-btn.danger {
    border-color: rgba(239, 68, 68, 0.5);
    color: #fca5a5;
  }

  .action-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .brightness-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.78rem;
    color: var(--hlw-muted);
  }

  .brightness-row input[type="range"] {
    flex: 1;
    accent-color: var(--hlw-accent);
    cursor: pointer;
  }

  .palette-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .palette-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.72rem;
    color: var(--hlw-muted);
  }

  .swatch-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .swatch-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }

  .swatch {
    appearance: none;
    width: 100%;
    min-width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    cursor: pointer;
    position: relative;
    padding: 0;
  }

  .swatch-row .swatch {
    width: 30px;
    height: 30px;
  }

  .swatch.active {
    outline: 2px solid #fff;
    outline-offset: 1px;
    transform: scale(1.04);
  }

  .swatch-white {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--hlw-muted);
    font-size: 0.65rem;
  }

  .swatch-white .dot {
    width: 30px;
    height: 26px;
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.22);
  }

  .swatch-white.active .dot {
    outline: 2px solid #fff;
    outline-offset: 1px;
  }

  .banner {
    padding: 7px 10px;
    border-radius: 8px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .banner.warn {
    background: rgba(245, 158, 11, 0.14);
    border: 1px solid rgba(245, 158, 11, 0.45);
    color: #fde68a;
  }

  .banner.ok {
    background: rgba(16, 185, 129, 0.14);
    border: 1px solid rgba(16, 185, 129, 0.45);
    color: #a7f3d0;
  }

  .banner.error {
    background: rgba(239, 68, 68, 0.14);
    border: 1px solid rgba(239, 68, 68, 0.45);
    color: #fecaca;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 999;
  }

  .modal {
    width: 100%;
    max-width: 420px;
    background: var(--hlw-bg);
    color: var(--hlw-text);
    border: 1px solid var(--hlw-border);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }

  .modal h3 {
    margin: 0;
    font-size: 0.96rem;
  }

  .modal label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.78rem;
    color: var(--hlw-muted);
  }

  .modal input,
  .modal select,
  .edit-panel input,
  .edit-panel select,
  .edit-panel textarea {
    background: var(--hlw-surface);
    color: var(--hlw-text);
    border: 1px solid var(--hlw-border);
    border-radius: 8px;
    padding: 7px 10px;
    font-size: 0.82rem;
    font-family: inherit;
    box-sizing: border-box;
    width: 100%;
  }

  .edit-panel {
    margin: 2px 12px 12px;
    padding: 10px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.06);
    border: 1px solid rgba(245, 158, 11, 0.35);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .edit-tabs,
  .edit-actions-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .edit-stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .edit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 8px;
    align-items: end;
  }

  .edit-grid label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.74rem;
    color: var(--hlw-muted);
  }

  .inline-check {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    color: var(--hlw-text);
    cursor: pointer;
  }

  .inline-check input {
    width: auto;
  }

  .edit-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 155px;
    overflow-y: auto;
  }

  .edit-list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 5px 8px;
    border-radius: 6px;
    background: var(--hlw-surface);
    border: 1px solid var(--hlw-border);
    font-size: 0.75rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
    flex-wrap: wrap;
  }

  .wizard-modal {
    max-width: 460px;
  }

  .wizard-sliders {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .wizard-sliders input[type="range"] {
    width: 100%;
    padding: 0;
    accent-color: var(--hlw-accent);
  }

  .empty-state {
    padding: 28px 16px;
    text-align: center;
    color: var(--hlw-muted);
    font-size: 0.88rem;
  }
`;
