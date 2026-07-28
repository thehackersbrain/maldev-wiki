export type RuleKind = 'SIGMA' | 'YARA' | 'ETW-TI' | 'MEMORY';

export interface Rule {
  kind: RuleKind;
  /** filter bucket this rule belongs to */
  filter: 'sigma' | 'yara' | 'etw' | 'memory';
  title: string;
  mitre: string;
  /** technique page this rule was written against */
  href: string;
  desc: string;
  /** telemetry the rule reads */
  src: string;
  fp: string;
  updated: string;
}

export const ruleFilters = [
  { id: 'all', name: 'All' },
  { id: 'sigma', name: 'Sigma' },
  { id: 'yara', name: 'YARA' },
  { id: 'etw', name: 'ETW / ETW-TI' },
  { id: 'memory', name: 'Memory scan' },
] as const;

export const rules: Rule[] = [
  {
    kind: 'SIGMA',
    filter: 'sigma',
    title: 'Unbacked executable memory in signed host',
    mitre: 'T1055.012',
    href: '/techniques/injection/process-hollowing',
    desc: 'Flags a remote thread whose start address has no backing module, inside a Microsoft-signed process.',
    src: 'sysmon eid 8',
    fp: 'low',
    updated: '07-14',
  },
  {
    kind: 'YARA',
    filter: 'yara',
    title: 'Reflective loader stub signature',
    mitre: 'T1620',
    href: '/techniques/injection/reflective-dll-loading',
    desc: 'Matches the classic bootstrap prologue that walks the export table by hash before mapping itself.',
    src: 'memory scan',
    fp: 'medium',
    updated: '07-12',
  },
  {
    kind: 'ETW-TI',
    filter: 'etw',
    title: 'RW → RX protection flip on private memory',
    mitre: 'T1055',
    href: '/techniques/injection/process-hollowing',
    desc: 'Catches loaders that stage with RW and only mark executable immediately before the jump.',
    src: 'etw threat-intel',
    fp: 'medium',
    updated: '07-06',
  },
  {
    kind: 'SIGMA',
    filter: 'sigma',
    title: 'ntdll .text restored from disk',
    mitre: 'T1562.001',
    href: '/techniques/evasion/unhooking-ntdll',
    desc: 'Correlates a file read of ntdll.dll with a self-process write into its own text section.',
    src: 'sysmon eid 11 + 10',
    fp: 'low',
    updated: '07-19',
  },
  {
    kind: 'MEMORY',
    filter: 'memory',
    title: 'PEB image base vs. loader module mismatch',
    mitre: 'T1055.012',
    href: '/techniques/injection/process-hollowing',
    desc: 'Structural artifact left by every hollowing variant; the highest-fidelity signal in the pack.',
    src: 'volatility plugin',
    fp: 'very low',
    updated: '06-28',
  },
  {
    kind: 'YARA',
    filter: 'yara',
    title: 'Ekko / Foliage timer-queue ROP chain',
    mitre: 'T1027.007',
    href: '/techniques/evasion/sleep-obfuscation',
    desc: 'Matches the queued RtlCaptureContext + NtContinue gadget sequence used by timer-based sleep masks.',
    src: 'memory scan',
    fp: 'medium',
    updated: '07-19',
  },
  {
    kind: 'ETW-TI',
    filter: 'etw',
    title: 'Thread created with a non-image start address',
    mitre: 'T1055.003',
    href: '/techniques/injection/thread-execution-hijacking',
    desc: 'ETW-TI thread-create events whose start address falls outside any mapped image in the target.',
    src: 'etw threat-intel',
    fp: 'low',
    updated: '07-02',
  },
  {
    kind: 'SIGMA',
    filter: 'sigma',
    title: 'COM TreatAs remap on a system CLSID',
    mitre: 'T1546.015',
    href: '/techniques/persistence/com-hijacking',
    desc: 'Registry write adding a TreatAs subkey under a CLSID owned by a shipped Windows component.',
    src: 'sysmon eid 13',
    fp: 'very low',
    updated: '07-11',
  },
];

export const sigmaSample = `title: Unbacked Executable Memory In Signed Host
logsource:
  product: windows
  category: create_remote_thread
detection:
  selection:
    StartModule: null
    TargetImage|endswith: ['\\svchost.exe', '\\rundll32.exe']
  condition: selection
level: high`;
