# Duellmeister – PWA

Statische Web-App, keine Build-Schritte nötig.

## Hosten
Den kompletten Ordnerinhalt auf einen Webserver mit HTTPS legen (z. B. Vercel, Netlify, GitHub Pages,
oder ein Unterordner deines Webspace wie `https://deine-domain.de/duellmeister/`).

- `index.html`   – das Spiel
- `manifest.json`– App-Name, Icons, Vollbild/Querformat
- `sw.js`        – Service Worker (Offline-Cache)
- `img/`         – Spielfeld, Kartenrahmen, App-Icons

## Installieren
Seite im Handy-Browser öffnen → Menü → „Zum Startbildschirm hinzufügen" / „App installieren".
Danach startet sie als Vollbild-App im Querformat und läuft auch offline.

## Neue Version ausrollen
In `sw.js` den Wert `CACHE='duellmeister-v1'` hochzählen (v2, v3 …), damit Nutzer die neue Version bekommen.
