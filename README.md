# 🏷️ HTML-Tag-Zähler

Ein schnelles CLI-Tool, das eine Webseite abruft und eine kategorisierte, visuelle Aufschlüsselung aller enthaltenen HTML-Tags erstellt — inklusive Anzahl und Balkendiagrammen direkt im Terminal.

## Beispielausgabe

```
🌐 Abrufen: https://ianbull.com/

✅ 19.3 KB HTML abgerufen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TAG-ANALYSE FÜR https://ianbull.com/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Gefundene Tags gesamt : 181
  Eindeutige Tag-Typen  : 30
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Dokument  (3 gesamt)
  ────────────────────────────────────────
  <html              1  █
  <head              1  █
  <body              1  █

🏗️  Struktur  (46 gesamt)
  ────────────────────────────────────────
  <div              23  ███████████████████████
  <span             16  ████████████████
  ...
```

## Voraussetzungen

- [Bun](https://bun.sh) v1.0 oder neuer

## Verwendung

```bash
bun run tag-counter.ts
```

Die Ziel-URL ist oben in `tag-counter.ts` festgelegt:

```ts
const URL = "https://ianbull.com/";
```

Ändere sie auf eine beliebige URL, die du analysieren möchtest.

## Tag-Kategorien

Tags werden in acht Kategorien gruppiert:

| Kategorie | Beispiele |
|---|---|
| 📄 Dokument | `html`, `head`, `body` |
| 🏗️ Struktur | `div`, `span`, `section`, `header`, `nav`, `main`, `footer`, … |
| 📝 Text | `p`, `a`, `h1`–`h6`, `strong`, `em`, `code`, `blockquote`, … |
| 📋 Liste | `ul`, `ol`, `li`, `dl`, `dt`, `dd`, `menu` |
| 🖼️ Medien | `img`, `video`, `audio`, `svg`, `canvas`, `iframe`, … |
| 📊 Tabelle | `table`, `thead`, `tbody`, `tr`, `th`, `td`, … |
| 📬 Formular | `form`, `input`, `button`, `select`, `textarea`, … |
| 🔧 Metadaten | `meta`, `title`, `link`, `script`, `style`, … |

Jedes Tag, das keiner bekannten Kategorie zugeordnet wird, wird unter **❓ Sonstiges** aufgeführt.

## So funktioniert’s

1. **Abrufen** — Lädt das rohe HTML der Ziel-URL mit der nativen `fetch`-API herunter.
2. **Extrahieren** — Durchsucht das HTML mit einem Regex, um jeden öffnenden Tag-Namen zu sammeln.
3. **Zählen** — Ermittelt die Häufigkeit jedes eindeutigen Tags.
4. **Kategorisieren** — Ordnet jedes Tag über die `TAG_CATEGORIES`-Lookup-Tabelle seiner Kategorie zu.
5. **Ausgeben** — Gibt eine sortierte Zusammenfassung mit Balkendiagrammen auf stdout aus (Tags innerhalb jeder Kategorie sind nach Häufigkeit absteigend sortiert).