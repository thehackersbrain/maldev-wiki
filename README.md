# maldev wiki

Live at **maldev.thehackersbrain.dev** · built by Gaurav Raj ([@thehackersbrain](https://github.com/thehackersbrain)).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run check    # astro check (types + templates)
```

## Structure

```
src/
  content/techniques/<category>/<slug>.mdx   technique pages (the wiki content)
  content.config.ts                          frontmatter schema for those pages
  data/                                      categories, toolkit, detection rules
  components/                                see below
  layouts/                                   BaseLayout, DocsLayout (sidebar shell)
  pages/                                     routes
  lib/nav.ts                                 docs tree, shared by both navs
  lib/filter-bar.ts                          client wiring for <FilterBar />
  lib/shiki-theme.ts                         syntax theme matching the palette
  styles/global.css                          Tailwind theme tokens + article prose styles
```

### Components

Pages are assembled from these rather than repeating markup — change the component and every
page follows.

| Component                              | Used by                                            |
| -------------------------------------- | -------------------------------------------------- |
| `PageHeader`                           | every non-home page (breadcrumb + title + intro)   |
| `SectionLabel`                         | the `# label` mono headings                        |
| `FilterBar`                            | category index, detection library                  |
| `TechniqueRow`                         | category index, technique index                    |
| `StepList`                             | article call chains, contribute steps              |
| `CallChain`                            | thin wrapper over `StepList` for API chains        |
| `Pill` / `Badge`                       | MITRE ids, platform tags, CODE / DETECTION markers |
| `CodeBlock`                            | every sample outside markdown (chrome + copy)      |
| `Callout`                              | danger / note / caution blocks                     |
| `AuthorLink`                           | the avatar + handle credit on articles             |
| `CategoryCard`, `ToolCard`, `LinkCard` | home grid, toolkit, contribute                     |
| `Sidebar`, `MobileDocsNav`             | the docs tree at `lg+` and below `lg`              |

Adding a filterable list means rendering `<FilterBar />` and calling `initFilterBar()` with a
`match` predicate — single-select and multi-select bars share one implementation.

## Routes

| Mockup screen  | Route                                    |
| -------------- | ---------------------------------------- |
| Home           | `/`                                      |
| Category index | `/techniques`, `/techniques/[category]`  |
| Article        | `/techniques/[category]/[slug]`          |
| Search         | `/search` (also `/search?q=…`)           |
| Toolkit        | `/toolkit`                               |
| Detections     | `/detections`                            |
| Contribute     | `/contribute`                            |

Everything is statically generated — no client framework, only small vanilla-TS islands for the
copy buttons, sidebar filter, category/rule filters, TOC scroll-spy and search.

## Adding a technique page

Drop an `.mdx` file into `src/content/techniques/<category>/`. The `category` in frontmatter must be
one of the slugs in `src/data/categories.ts`; the file's path determines the URL. Frontmatter is
validated at build time by `src/content.config.ts` — a page with no `detections` entry still builds,
but the contribute page documents it as a merge requirement.

The `author` handle links to `https://git.maldev.wiki/<author>` by default; set `authorUrl` in
frontmatter to point somewhere else.

Structured blocks are placed by the page itself, so the order matches the mockup:

```mdx
<CallChain steps={frontmatter.callChain} />
<DetectionGrid items={frontmatter.detections} />
<RelatedList items={frontmatter.related} />
```

Sidebar sections, category listings, the "recently updated" table on the home page and the search
index are all derived from the collection — nothing needs updating by hand when a page is added.

## Responsive behaviour

Three layouts, not a scaled-down desktop:

- **below `lg` (1024px)** — the sidebar is replaced by `<MobileDocsNav />`, a disclosure above the
  content holding the same tree. The header's primary nav moves to its own scrollable row.
- **`lg`** — sidebar returns, header nav goes inline, GitHub link appears.
- **`xl`** — the article table of contents appears in the right rail.

The header search box is `sm:w-full sm:max-w-[290px]` rather than a fixed width, and the hero's
backdrop layers are full-bleed (`w-screen`, centred) so they clip at the viewport edge instead of
mid-page at the container edge. `body` carries `overflow-x: clip` — `clip`, not `hidden`, so sticky
positioning keeps working.

## Repo documents

| File                | Covers                                                        |
| ------------------- | ------------------------------------------------------------- |
| `CONTRIBUTING.md`   | How to add a page, run it locally, and what gets a PR rejected |
| `STYLE.md`          | Voice, page structure, frontmatter, code samples, citations    |
| `DISCLOSURE.md`     | What the wiki publishes and what it holds back                 |
| `LICENSE`           | CC BY-SA 4.0 for content, MIT for the implementation           |

## SEO

Everything that lands in `<head>` or structured data flows from `src/lib/seo.ts` — change the domain
there (and in `astro.config.ts`) and canonicals, sitemap, RSS and JSON-LD follow.

- **Canonicals** on every page, built from `Astro.site` + pathname.
- **`@astrojs/sitemap`** → `/sitemap-index.xml`, technique pages weighted 0.9, `/search` excluded
  (it is also `noindex` and `Disallow`ed in `robots.txt`).
- **JSON-LD** — `TechArticle` on technique pages (carrying the MITRE id as `identifier`),
  `BreadcrumbList`, `WebSite` + `SearchAction` on the home page, `CollectionPage` on the indexes.
- **Open Graph / Twitter** — full tags plus `article:published_time` / `modified_time` / `author`
  on technique pages, and a 1200×630 card at `public/og.png`.
- **RSS** at `/rss.xml`, generated from the same collection, linked via `<link rel="alternate">`.
- **Self-hosted fonts** via Astro's `fonts` config — no request to `fonts.googleapis.com`, and the
  woff2 files are preloaded from our own origin.
- **404** at `src/pages/404.astro`, `noindex`, linking back into the category grid.

The domain, site name, repo URL and creator credit all live in `src/lib/seo.ts` (the domain is
also set in `astro.config.ts`, which Astro needs at build time).

Regenerate the social card with `python3 scripts/make-og.py` (needs Pillow; the Space Grotesk TTFs
sit next to it).

## Design tokens

The mockup's palette and typography live in `@theme` in `src/styles/global.css`
(`bg`, `panel`, `bd`, `tx`, `dim`, `faint`, `acc`, `warn`, `danger`, `info`, `purple`), so classes
read as `bg-panel`, `text-dim`, `border-accd`. Code highlighting uses the same colours via a custom
Shiki theme.

## Content note

Technique pages are written for detection engineering and authorized testing: samples are abridged
reference implementations, and every page pairs them with the telemetry that catches them.
