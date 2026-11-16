# HOAS LightWidget

Eigenständiges Home-Assistant **Licht-Studio** (Menüleisten-Tool in voller Breite **und** Lovelace Custom Card `custom:hoas-light-widget`) zur räumlichen 3D/2D-Visualisierung, Möbel-/Raumskizzierung, Lampen-Design-Gestaltung und einheitlichen Ambiente-Lichtsteuerung.

Siehe [docs/CONCEPT.md](docs/CONCEPT.md) für die Architektur- und Bedienspezifikation.

## Features

* **Eigenständiges Menüleisten-Tool (`Licht-Studio`):** Nutzt die volle verfügbare Breite im Home-Assistant-Interface und speichert Raum-Layouts zentral auf dem HA-Server (`Store` + WebSocket-API).
* **Freies Raum- & Möbeldesign:** Grundrisse als Rechteck, L-Form, kombinierte Räume oder frei skizzierbar; Fenster/Türen; Möbel inkl. gerader Couch, **L-Form-Couch**, **U-Form-Couch**, **Schrank/Regal**, Sideboard, TV, Tisch/Schreibtisch.
* **Unterscheidbares Lampen-Design:** Wähle in 3D & 2D zwischen **LED-Strip** (Band/über Eck), **Stehlampe mit Schirm**, **Stehlampen-LED-Säule**, **Spot/Strahler** (mit Kegel & Ausrichtung), **Glühlampe**, **Tisch-/Bodenlampe** und **Deckenleuchte**.
* **Hardware-kompatibler Color-Mode Translator:** Übersetzt Farben & Kelvin automatisch passend für `hue` (`xy`/`color_temp_kelvin`), `tuya_lamp_local` (`hs`/`white`), `mqtt` (`hs`/`color_temp_kelvin`), `rgb` und `brightness`-Dimmer.
* **Abgleich-Assistent & HA-Szenen:** Geführter Farb-Abgleich zwischen Lampen-Herstellern + Speichern aller Raum-Lampen (inkl. `"off"`) als native `scene.*`.

## Installation über den Home Assistant Marketplace (HACS)

Seit v0.2.0 wird HOAS LightWidget als **Integration** (inkl. eigenständigem Menüleisten-Tool + Dashboard-Card) ausgeliefert:

1. In Home Assistant unter **Einstellungen → Marketplace** (bzw. HACS) → **⋮ → Benutzerdefinierte Repositories** öffnen.
2. Repository **`kahel-soft/HOAS-LightWidget`** mit Kategorie **`Integration`** hinzufügen *(falls früher als Plugin hinzugefügt, das alte Custom Repository zuerst entfernen)*.
3. **HOAS LightWidget** herunterladen und **Home Assistant neu starten**.
4. Danach unter **Einstellungen → Geräte & Dienste → + Integration hinzufügen** nach **HOAS LightWidget** suchen und bestätigen.
5. **Licht-Studio** erscheint sofort in der linken Menüleiste!

## Entwicklung

```bash
npm install
npm run dev        # Lokaler Test-Harness unter http://localhost:5173
npm run typecheck  # TypeScript-Prüfung
npm test           # Unit-Tests (Vitest)
npm run build      # Baut dist/hoas-light-widget.js & custom_components/.../frontend/hoas-light-widget.js
```
