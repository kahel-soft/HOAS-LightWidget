# HOAS LightWidget

Smartphone-optimierte Home-Assistant Custom Lovelace Card (`custom:hoas-light-widget`) zur räumlichen 3D/2D-Visualisierung, Positionierung und einheitlichen Ambiente-Lichtsteuerung pro Raum/Bereich.

Siehe [docs/CONCEPT.md](docs/CONCEPT.md) für die vollständige Spezifikation.

## Entwicklung

```bash
npm install
npm run dev        # Lokaler Test-Harness unter http://localhost:5173
npm run typecheck  # TypeScript-Prüfung
npm test           # Unit-Tests (Vitest)
npm run build      # Selbstenthaltenes ES-Bundle nach dist/hoas-light-widget.js
```

## Integration über den Home Assistant Marketplace (HACS)

Dieses Repository ist als Frontend-Plugin (`category: plugin` / `lovelace`) über [hacs.json](hacs.json) und den automatisierten Release-Workflow [.github/workflows/release.yml](.github/workflows/release.yml) für den **Home Assistant Marketplace** vorbereitet:

1. Code auf GitHub pushen und ein Release-Tag setzen (z. B. `git tag v0.1.0 && git push --tags`). Der Workflow hängt `hoas-light-widget.js` automatisch an das GitHub-Release an.
2. In Home Assistant unter **Einstellungen → Marketplace** (bzw. HACS) das Repository über **Benutzerdefinierte Repositories** mit Kategorie **Plugin / Dashboard** hinzufügen.
3. **HOAS LightWidget** installieren – der Marketplace legt das Modul unter `/config/www/community/...` ab und registriert die Lovelace-Ressource automatisch.
4. Anschließend im Dashboard eine Karte vom Typ `custom:hoas-light-widget` hinzufügen.

## Direkter Test auf dem Home Assistant Server (ohne Release)

1. `npm run build` ausführen.
2. `dist/hoas-light-widget.js` auf dem Home-Assistant-Server nach `/config/www/hoas-light-widget.js` kopieren.
3. Unter **Einstellungen → Dashboards → ⋮ → Ressourcen** als **JavaScript-Modul (`module`)** mit URL `/local/hoas-light-widget.js?v=0.1.0` eintragen.
4. Bei späteren Builds den `?v=`-Parameter erhöhen (und Browser-/Companion-App-Cache leeren), da `/local/` 31 Tage gecacht wird.
