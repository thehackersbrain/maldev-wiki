export interface Category {
  /** URL slug — /techniques/<slug> */
  slug: string;
  /** short id used by the sidebar disclosure state */
  id: string;
  name: string;
  /** glyph shown on the home grid */
  sym: string;
  /** three-word teaser under the name */
  sub: string;
  /** intro paragraph on the category index */
  blurb: string;
}

export const categories: Category[] = [
  {
    slug: 'injection',
    id: 'inj',
    name: 'Process Injection',
    sym: '↳',
    sub: 'hollowing, APC, reflective',
    blurb:
      'Getting code to execute inside a process you do not own. Ordered roughly from foundational to bleeding-edge, each with a working sample and matching detection logic.',
  },
  {
    slug: 'evasion',
    id: 'eva',
    name: 'Evasion & Unhooking',
    sym: '⊘',
    sub: 'syscalls, AMSI, ETW',
    blurb:
      'Everything aimed at the sensor rather than the target: stripping userland hooks, blinding telemetry, and hiding a beacon between check-ins.',
  },
  {
    slug: 'loaders',
    id: 'ldr',
    name: 'Loaders & Packers',
    sym: '⧉',
    sub: 'PE loaders, crypters',
    blurb:
      'How a payload gets from bytes on disk to mapped, relocated and running — and which stage of that pipeline each detection actually watches.',
  },
  {
    slug: 'persistence',
    id: 'per',
    name: 'Persistence',
    sym: '⚓',
    sub: 'run keys, COM, WMI',
    blurb:
      'Surviving a reboot without owning the boot chain. Mostly configuration abuse, which is why the detections here are inventory problems more than memory problems.',
  },
  {
    slug: 'c2',
    id: 'c2',
    name: 'Command & Control',
    sym: '⇄',
    sub: 'beacons, tunnelling',
    blurb:
      'Channel design and the traffic it produces. Every page pairs the implant side with the network artifact a defender is left holding.',
  },
  {
    slug: 'anti-analysis',
    id: 'anti',
    name: 'Anti-Analysis',
    sym: '◫',
    sub: 'sandbox, anti-debug',
    blurb:
      'Checks a sample runs before it commits. Useful offensively, and useful defensively as a fingerprint — the checks themselves are loud.',
  },
  {
    slug: 'credential-access',
    id: 'cred',
    name: 'Credential Access',
    sym: '✦',
    sub: 'LSASS, tokens, tickets',
    blurb:
      'Reading secrets out of memory and off the wire. Heavily instrumented territory: assume every handle you open to LSASS is logged.',
  },
  {
    slug: 'detection',
    id: 'det',
    name: 'Blue Team & Detection',
    sym: '◉',
    sub: 'sigma, yara, forensics',
    blurb:
      'The other half of the wiki, read on its own: rule-writing craft, memory forensics workflow, and what each telemetry source can and cannot see.',
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
