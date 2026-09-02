export const ABOUT = {
  opening: {
    kicker: 'ABOUT',
    title: 'Curious builder at the intersection of systems, security, and AI.',
    paragraphs: [
      "I build real systems, learn fast, and go after the problems most people avoid. AI is my force multiplier — sophisticated workflows that let me do work that would otherwise take a team. Systems, security, and AI aren't separate disciplines to me, rather they're one practice, and I move between them naturally.",
      "Much of my fast-paced learning came from competing at a high level in security CTFs, taking wins across competitions hosted by IIT Bombay, IISc Bangalore, NIT Trichy, IIITs, and many other colleges and also from heading the cybersecurity vertical in RVCE's coding club.",
    ],
    linkedin: {
      label: 'MORE ON LINKEDIN',
      href: 'https://www.linkedin.com/in/bipin-raj-c-b61670283/',
    },
    byline: '— BIPIN RAJ C · SYSTEMS · SECURITY · AI',
  },

  hpe: {
    kicker: 'CURRENTLY WORKING AT',
    title: 'Hewlett Packard Enterprise',
    sub: 'HIGH PERFORMANCE COMPUTING · MONITORING · OBSERVABILITY · CEPH · EXASCALE STORAGE',
    paragraph:
      "I work in the High Performance Computing domain at HPE, on NGSM which is the system-management platform behind El Capitan, Frontier, and Aurora, some of the world's fastest supercomputers. My work spans Slingshot interconnect monitoring, Ceph-based exascale storage and Security integrations with NGSM. The platform serves Oak Ridge National Laboratory (ORNL, US), the US Department of Defence (DoD), Aramco, and many more of the largest HPC deployments in existence.",
    scale: [
      {
        label: 'DEPLOYMENT ENVIRONMENTS',
        value: 'EL CAPITAN · FRONTIER · AURORA · ORNL · US DOD · ARAMCO · AND MORE',
      },
    ],
  },

  vyuha: {
    kicker: 'SECURITY RESEARCH',
    title: 'Vyuha',
    sub: 'ADAPTIVE EDR EVASION & EVALUATION FRAMEWORK',
    meta: 'RESEARCH · EDR · WINDOWS INTERNALS · OFFENSIVE SECURITY',
    patent: 'PATENT · ACCEPTED IN INDIA',
    paragraph:
      "Led the offensive-security research track for Vyuha, an adaptive EDR evasion & evaluation framework built in collaboration with Technical University of Applied Sciences Würzburg-Schweinfurt (THWS), Germany. The work goes below the surface - studying how endpoint defenses observe execution, generate telemetry, correlate behavior, and catch sophisticated attacker tradecraft. A patent from this research has been accepted in India.",
  },

  nammaPothole: {
    kicker: 'CO-FOUNDER',
    title: 'Namma Pothole',
    sub: 'CIVIC-TECH · ROAD INFRASTRUCTURE · BANGALORE',
    paragraph:
      'I co-founded Namma Pothole, a civic-tech platform built to turn citizen reports into action on Bangalore’s roads. What started as a software system for reporting and tracking potholes has grown into a platform with ~1,500 reports filed, where we work with Greater Bangalore Authority (GBA) to coordinate and get reported potholes resolved on the ground. It’s a different kind of engineering challenge — the system doesn’t end when a request is submitted; it has to connect technology, citizens, and public infrastructure to produce a physical-world outcome.',
    chain: ['SOFTWARE', 'CITIZEN REPORTS', 'COORDINATION', 'PHYSICAL-WORLD OUTCOMES'],
    href: 'https://nammapothole.com/',
  },

  strengths: {
    kicker: 'STRENGTHS',
    groups: [
      {
        title: 'Security & Defense',
        items: ['Offensive Security', 'EDR / MDR', 'AI Security', 'LLM Security'],
      },
      {
        title: 'Systems & Infrastructure',
        items: ['Cloud Infrastructure & Security', 'Networking', 'Ceph & Exascale Storage Systems'],
      },
      {
        title: 'Data & Observability',
        items: ['Security data pipelines', 'Kafka', 'VictoriaMetrics', 'OpenSearch', 'Grafana'],
      },
      {
        title: 'AI & Agents',
        items: ['Reinforcement Learning', 'Agentic AI Systems & Workflows'],
      },
    ],
  },

  education: {
    kicker: 'EDUCATION & CREDENTIALS',
    degree: {
      school: 'RV College of Engineering',
      program: 'B.E. Computer Science & Engineering, Cybersecurity',
      period: 'DEC 2022 – AUG 2026 · COMPLETED',
      cgpa: '9.13 CGPA',
    },
    certifications: [
      {
        title: 'TryHackMe — Advent of Cyber 2023',
        href: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-KTPMHCTUBS.png',
      },
      {
        title: 'TryHackMe — Complete Beginner Learning Path',
        href: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-XC4XEG4UBL.png',
      },
      {
        title: 'Data Science for Engineers (NPTEL)',
        href: 'https://drive.google.com/file/d/1NmSqjOpde7ZOd3sEnLv6n-khpOCaAbge/view',
      },
      {
        title: 'Introduction to Soft Computing (NPTEL)',
        href: 'https://drive.google.com/file/d/1H8Fg_k9R2LEpz9dJv2rdzD86NczXwsJn/view',
      },
    ],
    publication: {
      title:
        'AnomalyX: An Adaptive Threat Detection System Using Retrieval-Augmented Generation and Advanced Time-Series Analytics',
      venue: 'IEEE',
      href: 'https://ieeexplore.ieee.org/document/11507418',
    },
  },

  toolbox: {
    kicker: 'TOOLBOX',
    groups: [
      { title: 'Languages', items: ['Python', 'Go', 'C++', 'Rust', 'TypeScript', 'SQL'] },
      {
        title: 'Systems / Infrastructure',
        items: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'CUDA'],
      },
      {
        title: 'AI / ML',
        items: ['AI Agents', 'Agentic AI', 'Agentic Memory', 'LLM Security', 'PyTorch', 'VectorDB', 'Qdrant'],
      },
      {
        title: 'Security',
        items: ['Wireshark', 'Burp Suite', 'Hydra', 'Wazuh', 'Metasploit', 'John the Ripper', 'Hashcat', 'Nmap', 'Autopsy'],
      },
      { title: 'Backend / Web', items: ['FastAPI', 'ReactJS', 'NextJS', 'TailwindCSS'] },
      { title: 'Data / Databases', items: ['Redis', 'PostgreSQL', 'MySQL', 'MongoDB'] },
      { title: 'Identity / Security Protocols', items: ['JWT', 'OAuth'] },
      { title: 'Development / Workflow', items: ['Git', 'GitHub Actions'] },
    ],
  },
};
