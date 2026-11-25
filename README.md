# ALF3B – Vorabversion 0.1

## Enthalten
- Installierbare PWA-Grundstruktur (Manifest, Icons, Service Worker)
- Originale Mitarbeiter- und Wochenbelegung aus `Einsatzplan_Versuch 1.xlsx`
- Umschaltbare Demo-Ansicht (Mitarbeiter / Admin-Demo)
- Bearbeitung der Wochenbelegung im lokalen Browser und CSV-Export
- Fest hinterlegte Schichtfolge als Anzeige: Woche 1 Früh, Woche 2 Nacht, Woche 3 Spät

## Wichtig: noch keine produktive Team-App
Die Admin-Umschaltung ist nur eine UI-Demo, keine Authentifizierung oder Zugriffssicherung.
Änderungen werden nur lokal im Browser gespeichert und nicht mit anderen Geräten geteilt.
Es gibt noch keine zentrale Datenbank, echten Konten, Passwort-Reset, Rollenprüfung serverseitig oder Veröffentlichungsadresse.

## Start lokal
Ein HTTPS-Hosting ist für Installation als PWA erforderlich (lokal kann `localhost` genutzt werden).
Zum Beispiel: `python -m http.server 8000` und dann `http://localhost:8000` öffnen.

## Vor produktivem Einsatz erforderlich
- Hosting unter HTTPS
- Authentifizierung für 1 Administrator, 1 Admin-Vertretung und Mitarbeiterkonten
- Serverseitige Rollen- und Leserechte
- Zentrale Datenbank und Synchronisation
- Verbindlicher Starttermin des 3-Wochen-Zyklus: Montag, 14.12.2026
- Klärung, wie die Excel-Wocheneinteilung den Schichten zugeordnet wird

Die Excel-Datei enthält Arbeitsbereiche pro Wochentag, aber keine explizite Früh-/Nacht-/Spät-Zuordnung oder Startwoche. Diese Angaben wurden daher nicht erfunden.
