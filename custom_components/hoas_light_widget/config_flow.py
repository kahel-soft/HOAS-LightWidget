"""Config Flow für HOAS LightWidget."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback

from .const import (
    CONF_SIDEBAR_ICON,
    CONF_SIDEBAR_TITLE,
    DEFAULT_SIDEBAR_ICON,
    DEFAULT_SIDEBAR_TITLE,
    DOMAIN,
)


class HoasLightWidgetConfigFlow(ConfigFlow, domain=DOMAIN):
    """Einrichtungs-Dialog für HOAS LightWidget."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Erster Konfigurationsschritt."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            return self.async_create_entry(
                title=user_input.get(CONF_SIDEBAR_TITLE, DEFAULT_SIDEBAR_TITLE),
                data=user_input,
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_SIDEBAR_TITLE, default=DEFAULT_SIDEBAR_TITLE): str,
                    vol.Required(CONF_SIDEBAR_ICON, default=DEFAULT_SIDEBAR_ICON): str,
                }
            ),
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Optionen-Flow zum Anpassen des Menüleisten-Eintrags."""
        return HoasLightWidgetOptionsFlow(config_entry)


class HoasLightWidgetOptionsFlow(OptionsFlow):
    """Optionen für den Sidebar-Eintrag."""

    def __init__(self, config_entry: ConfigEntry) -> None:
        self._config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Optionen speichern."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        current_title = self._config_entry.options.get(
            CONF_SIDEBAR_TITLE,
            self._config_entry.data.get(CONF_SIDEBAR_TITLE, DEFAULT_SIDEBAR_TITLE),
        )
        current_icon = self._config_entry.options.get(
            CONF_SIDEBAR_ICON,
            self._config_entry.data.get(CONF_SIDEBAR_ICON, DEFAULT_SIDEBAR_ICON),
        )

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_SIDEBAR_TITLE, default=current_title): str,
                    vol.Required(CONF_SIDEBAR_ICON, default=current_icon): str,
                }
            ),
        )
