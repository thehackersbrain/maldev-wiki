# Style guide

How pages on this wiki are written. The goal is that any two technique pages read like the same
person wrote them, and that a defender can act on either one without reading the other.

If you are adding a page, read this once and then use an existing page as your template —
`src/content/techniques/injection/process-hollowing.mdx` is the reference.

## Voice

**Write for a practitioner who is competent but new to this specific technique.** Assume they know
what a process and a DLL are. Do not assume they know what a PEB is — link it or explain it in one
clause.

**State the mechanism, not the marketing.** "Unmaps the legitimate image and writes a different PE
in its place" beats "leverages advanced memory manipulation to achieve stealthy execution."

**Prefer the plain word.** Utilise → use. Leverage → use. In order to → to. Perform an enumeration
of → enumerate.

**Second person is fine for instructions.** "Detonate inside a snapshotted VM" reads better than
"the analyst should detonate."

**Never hype a technique.** No "devastating", "undetectable", "next-generation". If a technique
evades a specific control, say which control and under what conditions. Anything described as
undetectable is a page that has not finished its detection section.

**Be honest about limits.** If a sample is abridged, say so. If a detection has a false-positive
population, name it. If a technique only works below a specific Windows build, put that in the
overview, not a footnote.

**Sentence case for headings.** "The call chain", not "The Call Chain".

**British or American spelling — pick one per page and stay consistent.** The existing corpus leans
British (`behavioural`, `normalise`).

## Page structure

Every technique page carries these sections, in this order:

| Section                    | Required | What belongs in it                                                   |
| -------------------------- | -------- | -------------------------------------------------------------------- |
| `## Overview`              | yes      | What it does and why it works, in 2–3 paragraphs. No code.           |
| `## The call chain`        | yes      | The `<CallChain />` block, one row per API in execution order.       |
| `## Reference implementation` | no    | Abridged, annotated sample. Omit for technique pages with no code.   |
| `## Verifying in the lab`  | no       | How to confirm the technique worked, with debugger or tool output.   |
| `## Detection`             | **yes**  | The `<DetectionGrid />` block plus prose ranking the signals.        |
| `## Variants & related`    | yes      | The `<RelatedList />` block. Link sideways, generously.              |

A page without a working detection does not merge. This is the one hard rule.

## Frontmatter

Validated at build time by `src/content.config.ts` — a bad field fails the build, so trust the error
message.

```yaml
---
title: Process Hollowing              # sentence case, the common name for the technique
mitre: T1055.012                      # exact ATT&CK id; use the parent if no sub-technique fits
category: injection                   # a slug from src/data/categories.ts
group: Image Replacement              # optional breadcrumb segment between category and page
summary: Replace the image of a suspended process before it ever executes.
platform: [Windows]                   # Windows | Linux | macOS
tags: ['x64 / x86', 'C / C++']        # architecture and language pills
updated: '2026-07-21'                 # YYYY-MM-DD, quoted, the date of the last real edit
author: your-handle                   # links to https://github.com/<handle>
authorUrl: https://example.com        # optional, overrides the profile link
readingTime: 9 min read               # optional
---
```

`summary` is load-bearing: it becomes the meta description, the search excerpt, the category listing
line and the RSS entry. One sentence, under 120 characters, describing what the technique *does* —
not what the page contains.

## Code samples

**Abridged is correct.** Cut error handling, cut the relocation loop, cut anything that does not
teach the mechanism. Say what you cut in the sentence above the block.

**Annotate the steps, and number them to match the call chain.**

```c
// 3. unmap the legitimate image  <-- heavily monitored
NtUnmapViewOfSection(pi.hProcess, imageBase);
```

**Comment the loud line.** Every technique has one call or allocation that generates the telemetry
the detection section keys on. Mark it inline so the reader connects the two halves of the page.

**Do not ship a working weapon.** No complete droppers, no live C2 addresses, no packed payloads, no
bypass for a specific named product's current build. See `DISCLOSURE.md`.

**Use `<CodeBlock />` for samples outside markdown fences**, so they get the filename chrome and the
copy button:

```mdx
<CodeBlock file="hollow.c" label="C" lang="c" class="mb-7.5" code={`...`} />
```

Inside a `code={\`...\`}` template literal, backslashes need doubling twice — `\\\\` in the source
renders as `\\` in a C string.

## Detections

Write them the way you would hand them to someone on shift.

**Name the telemetry source, not the vendor.** `SYSMON EID 8`, `ETW-TI`, `MEMORY SCAN`,
`BEHAVIOURAL`. A rule that only exists inside one product's console is not portable.

**One artifact per card.** If a detection needs two events correlated, that is one card describing
the correlation, not two cards.

**Rank them in the prose underneath.** Which is cheapest to run continuously, which is highest
fidelity, which only works during triage. A list of four equal-looking cards helps nobody choose.

**Say the false-positive population out loud.** "JIT engines generate private executable memory as
a matter of course" is more useful than a confidence score.

## Citations

Link inline, in the sentence that makes the claim:

```markdown
The [original Ekko implementation](https://github.com/Cracked5pider/Ekko) queues timers rather than
sleeping directly.
```

Cite the primary source — the research post, the paper, the original repo — not an aggregator that
reposted it. If a technique has a known first publisher, credit them in the overview. Do not cite
this wiki from this wiki; link the page directly instead.

Claims about how a specific security product behaves need a source or a date and a version, because
they go stale. "As of Sysmon 15.x" is fine. "EDRs hook this" is not.

## Cross-linking

Every page should link to at least two others. Use `related` in frontmatter for the structured
block, and inline links in prose wherever a concept has its own page. The wiki's value is in the
edges between techniques, not the nodes.

Internal links are root-relative and extensionless: `/techniques/injection/process-hollowing`.

## Before you open the PR

- `npm run check` passes (types and templates).
- `npm run build` passes.
- The detection section names at least one real telemetry source.
- You tested the rule in the lab kit and pasted the output in the PR description.
- Nothing in the diff would work as-is against a live target.
