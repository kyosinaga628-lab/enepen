# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"enepen." portfolio/portal site: a static, dependency-free HTML/CSS/JS site (no build step, no package manager, no tests, no linter). It showcases data-visualization and simulation projects in three categories: Energy, Finance, Viz. UI copy is in Japanese (`lang="ja"`).

To preview, open `index.html` directly or serve the repo root with any static server, e.g. `python -m http.server 8000`. Detail pages use relative paths (`../styles.css`, `../assets/...`), so they work both ways.

## Structure

- `index.html` — landing page: hero with rotating card stack, filterable project grid (`#projects`), footer/contact (`#contact`).
- `projects/<slug>.html` — one detail page per project. These are **not** the projects themselves; each is an intro page whose "サイトを見る" buttons link out to the externally hosted app.
- `styles.css` — the single shared stylesheet for both the landing page and detail pages (detail-page styles live under the "Project Detail Page Styles" section). Design tokens are CSS variables on `:root`.
- `script.js` — shared by all pages (detail pages include `../script.js` too). Handles category filtering, header shadow, hero card-stack rotation and glow parallax (the hero reveal animation is pure CSS; the h1 is deliberately not animated so it paints immediately). Code that touches landing-only elements must tolerate their absence on detail pages.
- `assets/` — `screenshot-<slug>.webp` (shown on the grid card and detail page) plus `screenshot-<slug>.png` (used only as the detail page `og:image`), `ogp-image.jpg` (1200×630), favicons. `404.html` uses root-relative paths.

## Adding a project

Follow the existing pattern (see the most recent commit, which added Fear & Greed Index JP):

1. Copy an existing `projects/*.html` as the template and update title/meta/OGP, badges, description, feature list, tech tags, and external URL (appears twice: hero and CTA).
2. Add `assets/screenshot-<slug>.png` and a WebP copy (max width 1200px). In `<img>` tags reference the `.webp` with `width`/`height` attributes and `loading="lazy"` (use `fetchpriority="high"` instead on the detail page hero image).
3. Add an `<a class="project-card" data-category="energy|finance|viz">` to the `.projects-grid` in `index.html`. The `data-category` value must match a `.filter-btn` `data-filter` for filtering to work. Card markup uses `project-image-<category>`, a `project-tag`, and `meta-badge` entries (`status-active` / `status-beta` with a type label like Tool / Media / Visual, plus Active / Beta).
4. SEO: the canonical host is `https://enepen.vercel.app` (the same repo is also served on GitHub Pages; canonical tags prevent duplicate-content issues). In the new detail page's `<head>`, keep the canonical / `og:url` / `og:image` / `twitter:*` / JSON-LD (`WebApplication` + `BreadcrumbList`) block with absolute URLs. Add the page to `sitemap.xml` and to the `ItemList` JSON-LD in `index.html`.
