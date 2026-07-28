export interface Tool {
  name: string;
  /** language / vendor pill next to the name */
  lang: string;
  desc: string;
  /** stars, vendor or "—" when neither applies */
  meta: string;
  href: string;
}

export interface ToolGroup {
  name: string;
  tools: Tool[];
}

export const toolGroups: ToolGroup[] = [
  {
    name: 'build & debug',
    tools: [
      {
        name: 'x64dbg',
        lang: 'C++',
        desc: 'Open-source user-mode debugger; the default for stepping through loader samples.',
        meta: '46k ★',
        href: 'https://github.com/x64dbg/x64dbg',
      },
      {
        name: 'WinDbg',
        lang: 'Windows',
        desc: 'Kernel and user-mode debugging, plus the !address and !peb views used across the wiki.',
        meta: 'Microsoft',
        href: 'https://learn.microsoft.com/windows-hardware/drivers/debugger/',
      },
      {
        name: 'mingw-w64',
        lang: 'C / C++',
        desc: 'Cross-compile every C sample on this site from Linux without a Windows toolchain.',
        meta: '—',
        href: 'https://www.mingw-w64.org/',
      },
      {
        name: 'Nim / Rust toolchains',
        lang: 'Nim, Rust',
        desc: 'Pinned configs for the non-C sample variants, including static CRT and stripped symbols.',
        meta: '—',
        href: 'https://www.rust-lang.org/tools/install',
      },
    ],
  },
  {
    name: 'analysis',
    tools: [
      {
        name: 'PE-bear',
        lang: 'C++',
        desc: 'Fast PE header and section inspection; used in every "verify the image" walkthrough.',
        meta: '3.1k ★',
        href: 'https://github.com/hasherezade/pe-bear',
      },
      {
        name: 'Volatility 3',
        lang: 'Python',
        desc: 'Memory forensics framework behind the malfind and module-list detections.',
        meta: '8.4k ★',
        href: 'https://github.com/volatilityfoundation/volatility3',
      },
      {
        name: 'API Monitor',
        lang: 'Windows',
        desc: 'Traces the exact call chain a technique makes, in the order the wiki documents it.',
        meta: '—',
        href: 'https://www.rohitab.com/apimonitor',
      },
      {
        name: 'Sysmon + config',
        lang: 'XML',
        desc: 'A tuned Sysmon config that produces the events every Sigma rule here expects.',
        meta: 'SwiftOnSecurity',
        href: 'https://github.com/SwiftOnSecurity/sysmon-config',
      },
    ],
  },
  {
    name: 'lab infrastructure',
    tools: [
      {
        name: 'lab-kit',
        lang: 'Vagrant',
        desc: 'One-command Windows 11 and Ubuntu analyst VMs, snapshotted and network-isolated.',
        meta: 'maldev wiki',
        href: '#',
      },
      {
        name: 'FLARE VM',
        lang: 'PowerShell',
        desc: 'Reverse-engineering distribution; our profile trims it to what the samples need.',
        meta: '7.2k ★',
        href: 'https://github.com/mandiant/flare-vm',
      },
      {
        name: 'INetSim',
        lang: 'Perl',
        desc: 'Fake internet for detonation — DNS, HTTP and TLS responders with no egress.',
        meta: '—',
        href: 'https://www.inetsim.org/',
      },
    ],
  },
];

export const labUpScript = `# isolated detonation VM, no host networking
git clone https://github.com/thehackersbrain/maldev-lab-kit && cd maldev-lab-kit
vagrant up win11-analyst --provider=libvirt
./lab snapshot clean # always revert here before detonating`;
