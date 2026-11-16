# HOAS-LightWidget – Technisches Konzept & Spezifikation

> **Projektziel:** Eine Smartphone-optimierte Home-Assistant Custom Lovelace Card (`custom:hoas-light-widget`) zur räumlichen 3D/2D-Visualisierung, Positionierung und einheitlichen Ambiente-Lichtsteuerung pro Raum/Bereich.

---

## 1. Rahmenbedingungen aus der Home-Assistant-Analyse

Geprüft gegen die verbundene Home-Assistant-Instanz (`2026.11.1`) unter Berücksichtigung der [AGENTS.md](../AGENTS.md) und [home-assistant-best-practices](../.agents/skills/home-assistant-best-practices/SKILL.md):

* **Stabile Identifikatoren:** Sämtliche Raum- und Lichtverknüpfungen nutzen ausschließlich `entity_id` und optional `area_id` – niemals `device_id`.
* **Moderne Licht-Parameter (HA 2026.3+):** Für Farbtemperaturen wird ausschließlich `color_temp_kelvin` verwendet (kein `color_temp`/Mireds).
* **Reale Hardware-Profile (`supported_color_modes`) im Zielsystem:**
  * **Tuya Local (`tuya_lamp_local`):** `["hs", "white"]` (z. B. Stehlampen Hauptlicht & Sockel, LED Couch, Wandlicht) – kein `xy` und kein `color_temp`.
  * **Philips Hue (`hue`):** `["color_temp", "xy"]` (2000–6535 K, z. B. Bodenlampe Rechts, Schlafzimmer) – kein `hs`.
  * **Zigbee2MQTT (`mqtt`) / Tuya-CCT:** `["color_temp", "hs"]` (2000–6535 K bzw. 2700–6500 K, z. B. Sideboard, Gaming Ambilight).
  * **Dimmer (`mqtt`):** `["brightness"]` (z. B. Flur Wandlampen) – keine Farbe/Farbtemperatur.
  * **Reine RGB-Leuchten:** `["rgb"]` (z. B. Ventilator RGB).
* **Gruppen & Bereichsvererbung:** Existierende Light-Groups (`is_group: true`, z. B. `light.stehlampen`, `light.wohnzimmer`) werden im Entity-Picker standardmäßig herausgefiltert bzw. markiert, damit physische Einzel-Lichtquellen platziert werden. Da einzelne Entities `area_id: null` direkt am Entity-Eintrag haben und den Bereich über das Device erben, löst der Picker effektive Bereiche über Device + Entity auf oder bietet alle `light.*` an.

---

## 2. Dashboard-Architektur (Smartphone-first & `sections`)

Um auf dem Smartphone versehentliches 3D-Kamera-Drehen beim Scrollen zu vermeiden und den Einrichtungsmodus sauber zu sperren:

1. **Haupt-Dashboard (`type: sections`):**
   * Kompakte `tile`- und `button`-Karten aktivieren gespeicherte Home-Assistant-Szenen (`scene.turn_on`, z. B. *Filmabend*, *TV-Abend*, *Gemütlich*) mit einem Tap.
   * Eine `shortcut`-Karte navigiert in die dedizierte Studio-Subview.
2. **Licht-Studio Subview (`subview: true` mit `back_path`):**
   * Läuft im `panel`-Modus (oder `sections` mit `grid_options: { columns: "full" }`), sodass die 3D/2D-Ansicht ohne Scroll-Konflikt den Bildschirm nutzt.
   * **Eine Multi-Room-Card** verwaltet beliebig viele Räume (*Wohnzimmer*, *Büro Kai*, *Schlafzimmer*, *Küche*, …) über eine Raum-Tab-Leiste am oberen Rand.
   * **Edit-Mode Standardmäßig gesperrt (Locked):** Im Alltag ist nur der *Control-Modus* aktiv; Raumgeometrie und Lampenpositionen sind vor versehentlichem Verschieben geschützt.

---

## 3. UI-Aufbau: Smartphone-Split-View & Interaktion

Auf Hochformat-Smartphones vertikal gestapelt (auf Tablet/Desktop automatisch 2-spaltig):

### A. Oberer Bereich: 3D-Couch-POV (Three.js)
* Perspektivkamera aus der hinterlegten Sitzposition (z. B. Couch Richtung TV/Leinwand).
* **Kamera-Presets:** *„Couch-Blick“* (Reset) und optionaler *„360° Orbit“*-Toggle.
* **Live-Glow:** Jede Lichtquelle rendert ihren aktuellen HA-Status bzw. die gewählte Vorschaufarbe als weiches Emissive-Leuchten plus lokalem Lichtschein auf Boden/Wand.
* **Komposit-Lampen:** Übereinanderliegende Lichtquellen (z. B. Stehlampe Hauptlicht oben + Sockel unten) sind in der Höhe (`Z`) getrennt und einzeln antippbar.

### B. Mittlerer Bereich: 2D-Draufsicht + Frontal-Höhenleiste
* **2D-Draufsicht (X-Y):** Zeigt den vollständigen Grundriss inkl. Referenzmöbel und **auch Bereiche hinter der Sitzposition** (z. B. Eck-LED-Strip hinter der Couch). Komposit-Lampen am selben `(X, Y)`-Punkt werden als konzentrischer Split-Marker (Innen-/Außenring) oder mit kleinem Klick-Offset dargestellt.
* **Frontalansicht (X-Z, per Tab/Toggle):** Zeigt exakt die Höhenverteilung (`Z`-Achse) – z. B. Bodenlampe vs. Stehlampe Hauptlicht vs. erhöhtes Wandlicht.

### C. Unterer Bereich: Auswahl, Farbkarte & Szenen-Aktionen
* **Multi-Selektion (Touch-optimiert):**
  * *Einzel-Tap:* Wählt eine Lampe direkt aus.
  * *`+ Mehrfach`-Toggle oder Long-Press:* Aktiviert Sammelauswahl über alle Ansichten (3D-POV, Draufsicht, Frontalansicht).
  * *Schnell-Chips:* Automatisch aus dem Raum abgeleitet (z. B. *Alle*, *Front*, *Hinten*, *Stehlampen*, *Auswahl aufheben*).
* **Master-Farbkarte:**
  * **Zuletzt verwendet** (letzte gewählte Töne) & **Favoriten** (anpinnbar, optional vorbelegbar aus Entity-`favorite_colors`).
  * **Weiß-Spektrum:** Kuratierte Kelvin-Stufen (z. B. 2000 K Kerze, 2400 K, 2700 K Warmweiß, 3000 K, 4000 K Neutral, 5500 K Tageslicht, 6500 K Kaltweiß).
  * **Farbtöne:** Abgestufte Farbfamilien (Pastell, Mittel, Satt, Tief) über Amber, Rot, Koralle, Magenta, Violett, Blau, Cyan, Mint, Grün.
  * **Helligkeits-Slider & Ein/Aus-Toggle** für die aktuelle Auswahl.
* **Mischbetrieb-Logik:**
  * Bei Auswahl einer Buntfarbe werden reine Dimmer-Lampen (`["brightness"]`) **automatisch übersprungen** und ein kompakter Hinweis-Banner eingeblendet.
* **Aktionen:**
  * *Live anwenden* (`scene.apply` / `light.turn_on`)
  * *Vorschau zurücksetzen* (sichert vor Beginn optional per `scene.create` mit `snapshot_entities` den Ausgangszustand)
  * *Als HA-Szene speichern* (Dialog zum Neuanlegen oder Überschreiben einer bestehenden Szene; speichert **alle** im Raum definierten Lampen inkl. ausgeschalteter Lampen explizit als `state: "off"`).

---

## 4. Color-Mode Translator & Abgleich-Assistent

### A. Automatische Parameter-Übersetzung pro Lampe
Beim Anwenden einer Farbe oder eines Weißtons aus der Farbkarte übersetzt der Dispatcher den Zielwert anhand von `supported_color_modes` + Kalibrierungsprofil pro `entity_id`:

| Gewählter Ton | `["color_temp", "xy"]` (Hue) | `["color_temp", "hs"]` (Z2M/CCT) | `["hs", "white"]` (Tuya) | `["rgb"]` | `["brightness"]` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Buntfarbe** | `xy_color` (CIE 1931) | `hs_color` | `hs_color` | `rgb_color` | Überspringen + Hinweis |
| **Warmweiß (< ~3800 K)** | `color_temp_kelvin` (geclampt) | `color_temp_kelvin` (geclampt) | Warmes `hs_color` (niedrig gesättigtes Amber/Orange passend zu Kelvin) | `rgb_color` aus Kelvin | `brightness` (oder überspringen) |
| **Neutral/Kaltweiß (≥ ~3800 K)** | `color_temp_kelvin` (geclampt) | `color_temp_kelvin` (geclampt) | `white: brightness` (bzw. kalibriertes `hs_color`) | `rgb_color` aus Kelvin | `brightness` (oder überspringen) |

Alle unterschiedlichen Zielwerte der markierten Lampen werden **atomar in einem Aufruf über `scene.apply`** (mit optionaler `transition`) gesendet.

### B. Geführter Abgleich-Assistent (Color Calibration Wizard)
1. **Referenz & Ziel wählen:** z. B. Referenz = `light.wohnzimmer_bodenlampe_rechts` (Hue), Ziel = `light.wohnzimmer_floor_lamp` (Tuya).
2. **Testanker prüfen:** Durchklicken typischer Prüffarben (Warmweiß 2700 K, Amber, Cyan, Violett) mit Live-Schaltung beider Lampen.
3. **Visueller Feinabgleich:** Regler für *Hue-Offset (°)*, *Sättigungs-Faktor (%)*, *Helligkeits-Faktor (%)* und *Warmweiß-Hue/Sat-Abstimmung*.
4. **Profil speichern:** Wird pro `entity_id` in der Card-Config hinterlegt und bei jeder Steuerung sowie beim Szenen-Speichern automatisch eingerechnet.

---

## 5. Edit-Mode & Grundriss-Skizzierer

Nur aktiv, wenn das Edit-Schloss entsperrt ist:

* **Grundriss zeichnen:** Orthogonales Raster-Zeichenwerkzeug (z. B. 0,25 m / 0,5 m Snap) für rechteckige Räume, **L-Formen** oder **kombinierte Doppelräume** (inkl. optionaler Teilwände/Durchgänge) + Raumhöhe `height_m` (keine Dachschrägen).
* **Referenzobjekte:** Platzieren von Couch (inkl. Blickrichtungs-Anker für Couch-POV), TV/Leinwand, Sideboard, Tisch, Bett, Schreibtisch.
* **Licht-Primitives platzieren:**
  * `point`: Einzelpunkt `[x, y, z]` (Bodenlampe, Wandspot, Tischlampe).
  * `vertical_column`: Vertikales Segment `[x, y, z_bottom]` → `[x, y, z_top]` (Stehlampen-Hauptlicht / Säule).
  * `polyline`: Mehrere 3D-Stützpunkte `[[x1, y1, z1], ...]` (LED-Strip **über Eck** hinter der Couch).
* **Backup:** JSON-Export/Import der gesamten Raum-Konfiguration direkt im Edit-Dialog.

---

## 6. Datenstruktur (Card-Konfiguration)

```ts
export interface HoasLightWidgetConfig {
  type: "custom:hoas-light-widget";
  default_room_id?: string;
  favorites?: PaletteColor[];
  recent_colors?: PaletteColor[];
  calibrations?: Record<string, EntityCalibration>;
  rooms: RoomConfig[];
}

export interface RoomConfig {
  id: string;
  name: string;
  area_id?: string;
  height_m: number;
  /** Orthogonales Grundriss-Polygon in Metern (Rechteck, L-Form, 2 kombinierte Räume) */
  floor_polygon: Array<{ x: number; y: number }>;
  /** Optionale Innenwände / Raumteiler */
  inner_walls?: Array<{ from: [number, number]; to: [number, number]; height_m?: number }>;
  camera_pov: {
    position: [number, number, number];
    target: [number, number, number];
  };
  furniture: FurnitureObject[];
  lights: LightPlacement[];
}

export interface LightPlacement {
  entity_id: string; // Stabiler HA-Identifier (niemals device_id)
  label?: string;
  group_tag?: string; // z. B. "Front", "Stehlampen", "Hinten"
  composite_id?: string; // Kopplung mehrerer Lichtquellen einer physischen Leuchte
  geometry:
    | { type: "point"; position: [number, number, number]; radius_m?: number }
    | { type: "vertical_column"; from: [number, number, number]; to: [number, number, number]; radius_m?: number }
    | { type: "polyline"; points: Array<[number, number, number]>; thickness_m?: number };
}

export interface EntityCalibration {
  hue_offset_deg?: number;
  saturation_scale?: number;
  brightness_scale?: number;
  warm_white_hue_deg?: number;
  warm_white_saturation_pct?: number;
}
```

---

## 7. Umsetzungs-Roadmap

1. **Phase 1 – Projekt-Setup:** TypeScript + Lit + Three.js + Vite/Rollup-Build, `hacs.json`, Shadow-DOM Custom Card Grundgerüst, lokaler Test-Harness.
2. **Phase 2 – 3D/2D Split-View & Live-States:** Grundriss-Extrusion, Möbel-Blöcke, Point/Column/Polyline-Lichter, Live-Glow aus `hass.states`.
3. **Phase 3 – Steuerung, Farbkarte & Szenen:** Multi-Selektion, Master-Farbkarte + Favoriten/Zuletzt, Color-Mode Translator (`hs`/`xy`/`rgb`/`color_temp_kelvin`/`white`), `scene.apply`, `scene.create`-Vorschau, HA-Szenen-Speicherung (alle Raum-Lampen inkl. `off`).
4. **Phase 4 – Edit-Mode:** Schloss-Toggle, Raster-Grundriss-Skizzierer (Rechteck/L-Form/kombiniert), Licht- & Höhen-Editor (`X/Y/Z`), JSON-Backup.
5. **Phase 5 – Abgleich-Assistent & Feinschliff:** Geführter Farb-Kalibrierungs-Wizard, Touch-Feinoptimierung auf dem Smartphone, HACS-/Marketplace-Release.

---

## 8. Marketplace-Integration & Ausführung am Home Assistant Server

Auf deinem Server (`Home Assistant 2026.11.1`) ist der eingebaute **Marketplace** (HACS-Nachfolger) mit `github_connected: true` und `lovelace_mode: "storage"` aktiv. Alle installierten Frontend-Plugins liegen unter `/config/www/community/<repo>/` und werden automatisch als `/local/community/<repo>/<filename>.js?v=...` (`type: module`) eingebunden.

### Voraussetzungen für die Marketplace-Verteilung
1. **Öffentliches/zugängliches GitHub-Repository** mit `hacs.json` (`filename: "hoas-light-widget.js"`, `homeassistant: "2026.3.0"`, `render_readme: true`) und `README.md`.
2. **Release-Asset über GitHub Actions (`.github/workflows/release.yml`):** Bei jedem Tag (`v*`) wird das selbstenthaltene ES-Bundle `dist/hoas-light-widget.js` gebaut und direkt als Release-Asset angehängt – dadurch lädt der HA Marketplace das fertige Bundle ohne `node_modules` oder Build-Tools auf dem HA-Server.
3. **Einbindung als Custom Repository im HA Marketplace:** Kategorie **`Plugin`** (`lovelace`). Nach Installation registriert der Marketplace die Dashboard-Ressource im Storage-Modus automatisch.

### Direkte Ausführung am HA-Server während der Entwicklung
* Da das Bundle inkl. Three.js größer als das ~128 KB-Limit für Inline-`data:`-Ressourcen ist, wird für Live-Tests direkt auf dem HA-Server entweder:
  * **Variante A (Empfohlen ab erstem Tag):** Vorab-Tag/Release im GitHub-Repo → Installation & Updates bequem über den **HA Marketplace** (`update_information` / Update).
  * **Variante B (Lokale Datei):** `dist/hoas-light-widget.js` nach `/config/www/hoas-light-widget.js` kopieren und einmalig über **Einstellungen → Dashboards → Ressourcen** (bzw. `lovelace/resources/create`) als `/local/hoas-light-widget.js?v=0.1.0` (`module`) registrieren (bei jedem Update `?v=` wegen des 31-Tage-Caches hochzählen).
