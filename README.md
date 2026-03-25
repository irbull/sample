# 🏷️ HTML Tag Counter

A fast CLI tool that fetches a webpage and produces a categorized, visual breakdown of every HTML tag it contains — complete with counts and bar charts, right in your terminal.

## Example Output

```
🌐 Fetching: https://ianbull.com/

✅ Fetched 19.3 KB of HTML

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TAG ANALYSIS FOR https://ianbull.com/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total tags found : 181
  Unique tag types : 30
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Document  (3 total)
  ────────────────────────────────────────
  <html              1  █
  <head              1  █
  <body              1  █

🏗️  Structural  (46 total)
  ────────────────────────────────────────
  <div              23  ███████████████████████
  <span             16  ████████████████
  ...
```

## Requirements

- [Bun](https://bun.sh) v1.0 or later

## Usage

```bash
bun run tag-counter.ts
```

The target URL is set at the top of `tag-counter.ts`:

```ts
const URL = "https://ianbull.com/";
```

Change it to any URL you want to analyze.

## Tag Categories

Tags are grouped into eight categories:

| Category | Examples |
|---|---|
| 📄 Document | `html`, `head`, `body` |
| 🏗️ Structural | `div`, `span`, `section`, `header`, `nav`, `main`, `footer`, … |
| 📝 Text | `p`, `a`, `h1`–`h6`, `strong`, `em`, `code`, `blockquote`, … |
| 📋 List | `ul`, `ol`, `li`, `dl`, `dt`, `dd`, `menu` |
| 🖼️ Media | `img`, `video`, `audio`, `svg`, `canvas`, `iframe`, … |
| 📊 Table | `table`, `thead`, `tbody`, `tr`, `th`, `td`, … |
| 📬 Form | `form`, `input`, `button`, `select`, `textarea`, … |
| 🔧 Metadata | `meta`, `title`, `link`, `script`, `style`, … |

Any tag not matched to a known category is listed under **❓ Other**.

## How It Works

1. **Fetch** — Downloads the raw HTML of the target URL using the native `fetch` API.
2. **Extract** — Scans the HTML with a regex to collect every opening tag name.
3. **Count** — Tallies occurrences of each unique tag.
4. **Categorize** — Maps each tag to its category using the `TAG_CATEGORIES` lookup table.
5. **Display** — Prints a sorted, bar-chart summary to stdout (tags within each category are sorted by count, descending).
