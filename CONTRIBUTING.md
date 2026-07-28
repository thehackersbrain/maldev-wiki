# Contributing

The wiki is a git repo of MDX. Fork it, add a page, open a PR — two maintainers review every merge.

Before you start, read [`DISCLOSURE.md`](./DISCLOSURE.md) (what we will and will not publish) and
[`STYLE.md`](./STYLE.md) (how pages are written). Most rejected PRs fail on one of those two, not on
the technical content.

## The process

**1. Open an issue first.** Say which technique you want to document. A maintainer checks it is not
already covered and that it clears the disclosure policy. This saves you writing a page we cannot
merge.

**2. Write the page.** Drop an `.mdx` file into `src/content/techniques/<category>/`. The path
determines the URL, and `category` in frontmatter must be a slug from `src/data/categories.ts`.
Follow the section order in `STYLE.md`.

**3. Ship a detection with it.** A technique page without a working Sigma, YARA or memory-scan rule
will not be merged. Test it in the lab kit and paste the output into the PR description.

**4. Open the PR.** CI builds the page, type-checks the templates and lints the code samples. Two
maintainer approvals merge it.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # types + templates — must pass
npm run build    # must pass
```

Node 20 or newer.

## Adding a page

```bash
cp src/content/techniques/injection/process-hollowing.mdx \
   src/content/techniques/<category>/<your-technique>.mdx
```

Then edit the frontmatter and body. Everything else wires itself up: the sidebar tree, the category
listing, the home page's "recently updated" table, the search index, the sitemap and the RSS feed
are all derived from the collection. You never edit a nav file.

Frontmatter is validated at build time by `src/content.config.ts`. If a field is wrong, the build
tells you which one.

## Adding a detection rule

Rules that appear on `/detections` live in `src/data/rules.ts`. Each one points at the technique page
it was written against, so add the page first. Include the telemetry source and an honest
false-positive rating — `very low` through `high`, not a number you made up.

## Adding a tool

`src/data/toolkit.ts`. Open source, pinned to a known-good revision, and actually used by something
on this wiki. We are not building a link farm.

## Working on the site itself

- **Components live in `src/components/`** and are documented in the README. Before adding markup to
  a page, check whether a component already covers it — `PageHeader`, `FilterBar`, `TechniqueRow`,
  `StepList`, `Pill`, `Badge`, `CodeBlock`, `Callout`.
- **Typography follows one rule:** if a human wrote it, Space Grotesk; if a machine emitted it —
  code, IDs, tags, timestamps, labels — JetBrains Mono.
- **Colours come from `@theme` tokens** in `src/styles/global.css`. Use `bg-panel`, `text-dim`,
  `border-accd`; do not hardcode hex values in markup.
- **Client-side JS stays in small vanilla islands.** No framework runtime ships to the browser.
- **Toggling visibility from JS uses the `hidden` attribute, never the `hidden` class.** Tailwind's
  preflight makes `[hidden]` `!important`, so an element carrying both can be hidden but never
  revealed.

## Commit messages

One page or one concern per commit. Present tense, lower case, no ticket prefixes:

```
add reflective dll loading page
fix breadcrumb aria-current on grouped pages
```

## What gets a PR rejected

- No detection section, or a detection nobody tested.
- A sample that would run against a live target as-is.
- A named product's current bypass.
- Claims about security tooling with no source and no date.
- Copy-pasted prose from a vendor blog. Cite it and write your own summary instead.

## Credit

Pages are credited by the `author` handle in frontmatter, which links to your GitHub profile. Set
`authorUrl` if you would rather point somewhere else. You keep credit on anything you write here;
see [`LICENSE`](./LICENSE) for the terms it is published under.
