# Disclosure policy

What this wiki publishes, what it holds back, and how to report something.

## Why this exists

Detection engineering does not work in the dark. You cannot write a rule for a technique you are not
allowed to read about, and defenders lose that trade every time — attackers already have the
technique, and the only party disadvantaged by silence is the person trying to catch it.

So this wiki documents offensive technique in public. The trade is that every page carries the
detection alongside the mechanism, and that we do not publish the last mile that turns understanding
into an incident.

## What we publish

- **Mechanisms.** How a technique works, call by call, including the API chain and the structures it
  touches.
- **Abridged reference implementations.** Enough to compile and study in a lab. Error handling,
  robustness and evasion polish are deliberately absent.
- **Detection logic.** Sigma, YARA, ETW and memory-scan rules, with their telemetry sources and
  false-positive populations.
- **Lab instructions.** How to detonate safely and observe the artifacts yourself.
- **Techniques that are already public.** If it is in a conference talk, a paper, a public repo or
  live malware that has been analysed, documenting it costs defenders nothing and helps them.

## What we do not publish

- **Working droppers or loaders.** No end-to-end tooling that runs against a target as-is.
- **Live infrastructure.** No C2 addresses, domains, redirectors or beacon configs, live or burned.
- **Ransomware payloads.** No encryption routines, key handling or extortion tooling, at any level of
  abridgement.
- **Product-specific bypasses.** No "this evades $VENDOR build 1234". Describe the class of control —
  userland hooks, image-load callbacks — not a current bypass for a named product's shipping version.
- **Unpatched vulnerabilities.** This is a technique wiki, not an advisory feed. See below.
- **Anything targeting a named victim.** No samples, indicators or infrastructure tied to a specific
  organisation, person or campaign victim.
- **Credential material or real captured data.** Including in screenshots and debugger output —
  redact before you paste.

## The line, in one sentence

If a page would save an attacker meaningful work rather than save a defender meaningful work, it
does not merge.

Reviewers apply that test directly. Two maintainers approve every technique page, and either can
send a page back for abridgement without further justification.

## Unpatched vulnerabilities

We do not publish 0-day. If a contribution depends on an unpatched vulnerability in shipping
software:

1. Do not open a public issue or PR describing it.
2. Report it to the vendor first, through their published security contact.
3. Come back once a fix has shipped, or once the vendor's own disclosure deadline has passed.

We will happily document the technique class in the meantime, without the specific vulnerability
that makes it exploitable today.

## Reporting a problem with the wiki

**A page that goes too far.** Open an issue titled `disclosure:` with the page and your reasoning, or
email the maintainer if you would rather not do it in public. We will take the page down while it is
being discussed rather than defend it in place — reverting is cheap.

**A vulnerability in this site.** Report privately to the maintainer. This is a static site with no
backend and no user accounts, so the realistic surface is the build pipeline and dependencies;
report those the same way.

**Incorrect attribution.** If a technique is credited to the wrong researcher, or your work is used
without credit, open an issue and we will fix it in the next merge.

**Content you believe is unlawful in your jurisdiction.** Tell us which jurisdiction and which page.
We publish from a research standpoint and will not geoblock, but we will review the page against
this policy.

## For readers

Everything here is published for detection engineering, malware analysis, and authorized red-team
work. Running these techniques against systems you do not own or lack written permission to test is
a crime in most jurisdictions, and the fact that you read it here is not a defence.

Detonate in an isolated VM with no host networking. The lab kit exists for exactly this — use it.

## Changes to this policy

This document is versioned with the wiki. Material changes go through the same two-maintainer review
as a technique page, and are called out in the commit message rather than slipped in.
