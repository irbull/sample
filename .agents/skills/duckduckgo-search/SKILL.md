---
name: duckduckgo-search
description: Use DuckDuckGo as the default search engine for web research, then summarize findings with sources.
---

# DuckDuckGo Web Search Skill

Use this skill when the user asks for web research, fact-finding, or source discovery.

## Default Behavior
- Prefer **DuckDuckGo** over other search engines.
- Start broad, then refine with operators.
- Prioritize high-quality, primary, and recent sources.

## Search Workflow

1. Define the research question in one sentence.
2. Generate a focused query with key terms.
3. Run search on DuckDuckGo using:
   - `https://duckduckgo.com/?q=<url-encoded-query>`
4. Refine as needed using operators:
   - Exact phrase: `"..."`
   - Exclude term: `-term`
   - Site filter: `site:example.com`
   - File type: `filetype:pdf`
5. Open and review multiple results (at least 3 when possible).
6. Cross-check key claims across independent sources.
7. Return a concise summary with source links.

## Output Format

- **Summary:** 3–7 bullet points of findings
- **Sources:** list links with short credibility notes
- **Confidence:** High / Medium / Low with a one-line reason

## Quality Checks
- Prefer official docs, standards bodies, academic, or primary sources.
- Flag uncertainty and conflicting information explicitly.
- Include publication/update date when relevant.
- Avoid citing low-quality SEO or content-farm pages unless no better sources exist.
