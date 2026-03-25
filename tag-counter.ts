#!/usr/bin/env bun

const URL = "https://ianbull.com/";

// Tag categories
const TAG_CATEGORIES: Record<string, string[]> = {
  "📄 Document":     ["html", "head", "body"],
  "🏗️  Structural":  ["header", "footer", "main", "nav", "section", "article", "aside", "div", "span", "details", "summary", "dialog", "template"],
  "📝 Text":         ["h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "strong", "em", "b", "i", "u", "s", "small", "mark", "abbr", "cite", "code", "pre", "blockquote", "q", "sub", "sup", "time", "var", "samp", "kbd", "del", "ins", "dfn", "bdi", "bdo", "ruby", "rt", "rp", "wbr", "br", "hr"],
  "📋 List":         ["ul", "ol", "li", "dl", "dt", "dd", "menu"],
  "🖼️  Media":        ["img", "picture", "source", "figure", "figcaption", "video", "audio", "track", "canvas", "svg", "iframe", "embed", "object", "param", "map", "area"],
  "📊 Table":        ["table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "col", "colgroup"],
  "📬 Form":         ["form", "input", "button", "select", "option", "optgroup", "textarea", "label", "fieldset", "legend", "datalist", "output", "progress", "meter"],
  "🔧 Metadata":     ["meta", "title", "link", "base", "style", "script", "noscript"],
};

function categorizeTag(tag: string): string {
  for (const [category, tags] of Object.entries(TAG_CATEGORIES)) {
    if (tags.includes(tag.toLowerCase())) {
      return category;
    }
  }
  return "❓ Other";
}

function extractTags(html: string): string[] {
  const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  const tags: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(html)) !== null) {
    tags.push(match[1].toLowerCase());
  }
  return tags;
}

async function main() {
  console.log(`\n🌐 Fetching: ${URL}\n`);

  let html: string;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    html = await response.text();
  } catch (err) {
    console.error("❌ Failed to fetch URL:", err);
    process.exit(1);
  }

  console.log(`✅ Fetched ${(html.length / 1024).toFixed(1)} KB of HTML\n`);

  // Count tags
  const tags = extractTags(html);
  const tagCounts = new Map<string, number>();
  for (const tag of tags) {
    tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }

  // Group by category
  const categoryMap = new Map<string, Map<string, number>>();
  for (const [tag, count] of tagCounts) {
    const category = categorizeTag(tag);
    if (!categoryMap.has(category)) {
      categoryMap.set(category, new Map());
    }
    categoryMap.get(category)!.set(tag, count);
  }

  // ── Summary ──────────────────────────────────────────────────
  console.log("━".repeat(52));
  console.log(`  TAG ANALYSIS FOR ${URL}`);
  console.log("━".repeat(52));
  console.log(`  Total tags found : ${tags.length}`);
  console.log(`  Unique tag types : ${tagCounts.size}`);
  console.log("━".repeat(52));

  // Sort categories: known ones first (in definition order), then "Other"
  const categoryOrder = [...Object.keys(TAG_CATEGORIES), "❓ Other"];
  const sortedCategories = [...categoryMap.keys()].sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  for (const category of sortedCategories) {
    const tags = categoryMap.get(category)!;
    const categoryTotal = [...tags.values()].reduce((a, b) => a + b, 0);

    console.log(`\n${category}  (${categoryTotal} total)`);
    console.log("  " + "─".repeat(40));

    // Sort tags within category by count desc
    const sorted = [...tags.entries()].sort((a, b) => b[1] - a[1]);
    for (const [tag, count] of sorted) {
      const bar = "█".repeat(Math.min(count, 30));
      console.log(`  <${tag.padEnd(14)} ${String(count).padStart(4)}  ${bar}`);
    }
  }

  console.log("\n" + "━".repeat(52));
  console.log("  Done! 🎉");
  console.log("━".repeat(52) + "\n");
}

main();
