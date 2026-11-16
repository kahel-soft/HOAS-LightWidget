"""HOAS LightWidget Home Assistant Integration."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import voluptuous as vol
from homeassistant.components import frontend, panel_custom, websocket_api
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import (
    CONF_SIDEBAR_ICON,
    CONF_SIDEBAR_TITLE,
    DEFAULT_SIDEBAR_ICON,
    DEFAULT_SIDEBAR_TITLE,
    DOMAIN,
    FRONTEND_JS_FILENAME,
    FRONTEND_URL_BASE,
    PANEL_COMPONENT,
    PANEL_URL_PATH,
    STORAGE_KEY,
    STORAGE_VERSION,
    VERSION,
)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Richtet HOAS LightWidget über einen Config Entry ein."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    store: Store[dict[str, Any]] = domain_data.setdefault(
        "store", Store(hass, STORAGE_VERSION, STORAGE_KEY)
    )

    if not domain_data.get("static_registered"):
        frontend_dir = Path(__file__).parent / "frontend"
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    FRONTEND_URL_BASE,
                    str(frontend_dir),
                    cache_headers=True,
                )
            ]
        )
        module_url = f"{FRONTEND_URL_BASE}/{FRONTEND_JS_FILENAME}?v={VERSION}"
        add_extra_js_url(hass, module_url)
        domain_data["module_url"] = module_url
        domain_data["static_registered"] = True

    if not domain_data.get("ws_registered"):
        _register_websocket_commands(hass, store)
        domain_data["ws_registered"] = True

    await _register_sidebar_panel(hass, entry, domain_data["module_url"])
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Aktualisiert Sidebar-Titel und -Icon nach Options-Änderung."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, _entry: ConfigEntry) -> bool:
    """Entfernt das Sidebar-Panel beim Entladen."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    return True


async def _register_sidebar_panel(
    hass: HomeAssistant, entry: ConfigEntry, module_url: str
) -> None:
    """Registriert das eigenständige Sidebar-Panel in Home Assistant."""
    sidebar_title = entry.options.get(
        CONF_SIDEBAR_TITLE, entry.data.get(CONF_SIDEBAR_TITLE, DEFAULT_SIDEBAR_TITLE)
    )
    sidebar_icon = entry.options.get(
        CONF_SIDEBAR_ICON, entry.data.get(CONF_SIDEBAR_ICON, DEFAULT_SIDEBAR_ICON)
    )

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name=PANEL_COMPONENT,
        frontend_url_path=PANEL_URL_PATH,
        sidebar_title=sidebar_title,
        sidebar_icon=sidebar_icon,
        module_url=module_url,
        embed_iframe=False,
        require_admin=False,
    )


def _register_websocket_commands(
    hass: HomeAssistant, store: Store[dict[str, Any]]
) -> None:
    """Registriert WebSocket-Endpunkte zur zentralen Speicherung der Raum-Layouts."""

    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{DOMAIN}/get_config",
        }
    )
    @websocket_api.async_response
    async def ws_get_config(
        _hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        data = await store.async_load()
        connection.send_result(msg["id"], {"config": data})

    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{DOMAIN}/save_config",
            vol.Required("config"): dict,
        }
    )
    @websocket_api.async_response
    async def ws_save_config(
        _hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        config = msg["config"]
        if not isinstance(config.get("rooms"), list):
            connection.send_error(
                msg["id"], "invalid_config", "config.rooms muss eine Liste sein"
            )
            return
        await store.async_save(config)
        connection.send_result(msg["id"], {"success": True})

    @callback
    def register() -> None:
        websocket_api.async_register_command(hass, ws_get_config)
        websocket_api.async_register_command(hass, ws_save_config)

    register()
