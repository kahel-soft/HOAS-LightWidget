# Home Assistant AI Agent Guidelines

This project uses the **`home-assistant-best-practices`** skill pack (located in [.agents/skills/home-assistant-best-practices/](.agents/skills/home-assistant-best-practices/SKILL.md) and [skills/home-assistant-best-practices/](skills/home-assistant-best-practices/SKILL.md)).

All AI agents working on configurations, automations, scripts, scenes, helpers, and dashboards in this project MUST follow these guidelines.

---

## 1. Core Principles

1. **Native over Templates**:
   - Always prefer native triggers and conditions (`numeric_state`, `state`, `time`, etc.) and purpose-specific triggers/conditions (`<domain>.<name>`) over Jinja2 templates. Native constructs are validated at load time, not runtime.
2. **Stable Identifiers (`entity_id` > `device_id`)**:
   - Never use `device_id` in automations or scripts (except Zigbee2MQTT autodiscovered device triggers). `device_id` is ephemeral and breaks when devices are re-paired or replaced. Always target entities (`entity_id`) or areas/floors/labels.
3. **Helper Selection**:
   - Use built-in helpers (`min_max`, `group`, `threshold`, `derivative`, `utility_meter`) before writing template sensors.
   - If a template sensor is necessary, prefer UI/flow-created Template Helpers over manual YAML entries, unless specific capabilities (like trigger-based templates or attribute definitions) require YAML.
4. **Appropriate Automation Modes**:
   - Do not blindly accept `mode: single`.
   - Motion lights with timer / delay: `restart`
   - Sequential operations (e.g. locks): `queued`
   - Independent per-entity handling: `parallel`
   - One-off alerts: `single`
5. **Safe Refactoring**:
   - Before renaming an entity or helper, perform an impact analysis across all automations, scripts, dashboards, and integrations.

---

## 2. References & Skill Resources

Refer to detailed runbooks in [.agents/skills/home-assistant-best-practices/references/](.agents/skills/home-assistant-best-practices/references/):
- **Triggers & Conditions**: [`triggers-and-conditions.md`](.agents/skills/home-assistant-best-practices/references/triggers-and-conditions.md)
- **Automation Actions**: [`automation-actions.md`](.agents/skills/home-assistant-best-practices/references/automation-actions.md)
- **Helpers**: [`helper-selection.md`](.agents/skills/home-assistant-best-practices/references/helper-selection.md)
- **Device Control**: [`device-control.md`](.agents/skills/home-assistant-best-practices/references/device-control.md)
- **Templates**: [`template-guidelines.md`](.agents/skills/home-assistant-best-practices/references/template-guidelines.md)
- **Dashboards**: [`dashboard-guide.md`](.agents/skills/home-assistant-best-practices/references/dashboard-guide.md) & [`dashboard-cards.md`](.agents/skills/home-assistant-best-practices/references/dashboard-cards.md)
- **Scenes**: [`scenes.md`](.agents/skills/home-assistant-best-practices/references/scenes.md)
- **Refactoring**: [`safe-refactoring.md`](.agents/skills/home-assistant-best-practices/references/safe-refactoring.md)
- **Blueprints**: [`blueprint-guide.md`](.agents/skills/home-assistant-best-practices/references/blueprint-guide.md)
- **Backups**: [`backups.md`](.agents/skills/home-assistant-best-practices/references/backups.md)
- **AppDaemon**: [`appdaemon.md`](.agents/skills/home-assistant-best-practices/references/appdaemon.md)
- **YAML Integrations**: [`yaml-only-integrations.md`](.agents/skills/home-assistant-best-practices/references/yaml-only-integrations.md)
- **Examples**: [`examples.yaml`](.agents/skills/home-assistant-best-practices/references/examples.yaml)

---

## 3. MCP Tool Integration

When the `home-assistant` MCP server is active, leverage available tools (`ha_get_overview`, `ha_search`, `ha_config_get_automation`, `ha_config_set_automation`, `ha_call_read_tool`, `ha_call_write_tool`, etc.) to inspect live entity state, validate configs, and apply automations reliably.
