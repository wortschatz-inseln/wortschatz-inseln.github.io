# Wortschatz-Inseln

Lern-App für Elli und Tom. Läuft im Browser, auch auf dem alten iPad (iOS 10).

**Öffnen:** https://wortschatz-inseln.github.io/

## Auf dem iPad
1. Link in Safari öffnen.
2. Teilen-Symbol → „Zum Home-Bildschirm“. Dann startet die App wie eine normale App.
3. Nach dem ersten Laden funktioniert sie auch ohne WLAN.

Fortschritt und Lernwochen speichert jedes Gerät für sich selbst im Browser.

## Neue Version bauen
- `src/boards/*.dc.html` sind die Seiten (Quelle), `build.mjs` baut daraus `docs/`.
- `npm install` einmal, dann `node build.mjs`.
- `docs/` wird über GitHub Pages ausgeliefert (Settings → Pages → Branch `main`, Ordner `/docs`).
- Nach einem Update lädt das iPad die neue Version beim nächsten Öffnen; ggf. die App einmal schließen und neu öffnen.

## Geräte, Profile, Lernwochen
- Beim ersten Öffnen führt die App in den Eltern-Bereich (Eltern-Code, Kinder, Lernwochen-Modus).
- Jedes Kind hat ein eigenes Profil mit eigenem Fortschritt. Alles liegt nur im Browser des Geräts.
- Sicherung: Eltern-Bereich → Sicherung. Die App erinnert alle 14 Tage.
- Lerninhalte (Übungen, Wortlisten) gehören zur App und werden im Repo veröffentlicht.
- Lernwochen sind pro Gerät wählbar: „selber verwalten“ (Standard) oder „aus der App“ (`src/data/lernwoche.json`).
