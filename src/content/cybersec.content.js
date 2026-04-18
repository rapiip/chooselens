import { contactLinks } from './site.config'

export const cybersecContent = {
  hero: {
    heading: 'root@rafif-alton:~$ whoami',
    lines: [
      '> Informatics student | Security-focused builder',
      '> Scope: Web application, network analysis, OSINT fundamentals',
      '> Status: [AVAILABLE FOR COLLABORATION]',
    ],
    ctas: [
      { label: './contact.sh', href: contactLinks.email },
      { label: 'cat links.txt', href: contactLinks.github },
    ],
  },
  about: {
    command: 'root@rafif-alton:~$ cat about.txt',
    paragraphs: [
      'Persona ini sengaja ditulis presisi dan hemat kata. Tujuannya bukan terlihat dramatis, tapi terasa kredibel bahkan sebelum ada daftar temuan yang benar-benar dipublikasikan.',
      'Portofolio versi awal menampilkan area minat, pendekatan analisis, dan format presentasi yang siap diisi dengan assessment nyata tanpa mengubah identitas visualnya.',
    ],
    stats: [
      'FOCUS AREAS      : Web App / Network / OSINT',
      'REPORTING STYLE  : Concise, evidence-first',
      'CURRENT STATE    : Draft frontend with structured placeholders',
    ],
  },
  projects: [
    {
      target: 'placeholder-web-app.local',
      scanType: 'Portfolio case-study slot',
      tools: 'Nmap, Nikto, Burp Suite, Manual review',
      status: '[DRAFT]',
      findings: 'Reserved for a future documented assessment with evidence and severity breakdown.',
    },
    {
      target: 'network-lab.internal',
      scanType: 'Network observation notes',
      tools: 'Wireshark, Nmap, Bash',
      status: '[RESEARCH]',
      findings: 'A conservative placeholder for packet analysis, mapping exercises, and attack-surface summaries.',
    },
  ],
  skills: [
    { label: 'Penetration Testing', percent: 80 },
    { label: 'Network Analysis', percent: 72 },
    { label: 'Vulnerability Assessment', percent: 60 },
    { label: 'OSINT Workflow', percent: 55 },
  ],
  terminalFiles: {
    'readme.txt': 'Choose Your Lens / Cybersecurity mode. This terminal is a controlled simulation, not a shell.',
    'scope.txt': 'Web Application\nNetwork Analysis\nOSINT Fundamentals',
    'contact.txt': 'Email, GitHub, and LinkedIn live in the secure-channel section below.',
  },
  contact: {
    heading: 'root@rafif-alton:~$ ./contact.sh',
    intro: '[+] Secure channel bootstrapped. Pick the route you want.',
    actions: [
      { label: 'open email', href: contactLinks.email },
      { label: 'open github', href: contactLinks.github },
      { label: 'open linkedin', href: contactLinks.linkedin },
    ],
  },
}
