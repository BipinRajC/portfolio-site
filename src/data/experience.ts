export const EXPERIENCE = {
  header: {
    kicker: 'EXPERIENCE',
    title: 'Where I\'ve built, researched, and shipped.',
  },

  records: [
    {
      num: '01',
      title: 'Hewlett Packard Enterprise',
      role: 'SYSTEMS SOFTWARE ENGINEER · HIGH PERFORMANCE COMPUTING (HPC)',
      dates: 'SEP 2026 — PRESENT',
      location: 'BANGALORE, INDIA · FULL TIME',
      oneLiner:
        "Working on the <strong>infrastructure</strong> behind some of the world's largest <strong>Supercomputers</strong> and <strong>HPC Systems</strong>.",
      narrative:
        "I work in the <strong>High Performance Computing</strong> domain at HPE, on <strong>NGSM</strong> which is the system-management platform behind <strong>El Capitan</strong>, <strong>Frontier</strong>, and <strong>Aurora</strong>, some of the world's fastest supercomputers. My work spans <strong>Slingshot interconnect monitoring</strong>, <strong>Ceph-based exascale storage</strong> and <strong>security integrations</strong> with NGSM. The broader monitoring platform I contribute to is deployed across major supercomputing environments including Frontier, Aurora, <strong>CINES</strong>, and <strong>Aramco</strong>.",
      contributions: [
        `Contributing to the broader HPE HPC monitoring ecosystem that supports deployments at <strong>Frontier</strong>, <strong>Aurora</strong>, <strong>CINES</strong>, and <strong>Aramco</strong> — cluster health, compute and non-compute nodes, cooling and power devices, workload managers (<strong>SLURM · PBS</strong>), and <strong>Slingshot interconnect</strong> telemetry.`,
        `Built a <strong>Python CLI framework</strong> around the <strong>Slingshot simulator</strong>, my primary individual contribution. One command runs <strong>HPCM</strong> read-only queries, fingerprints the system (compute nodes, vCPU, RAM, network configs, OS info), and auto-generates the network configuration <strong>YAML</strong>. No hand-filling.`,
        `Deploys simulated switches as <strong>Docker containers</strong> running <strong>Java/Xenon</strong> services that mock real hardware, arranged in a <strong>Dragonfly topology</strong> (32 switches per fully-connected group), multiple groups interconnected, up to <strong>~2,500 switches</strong>. Each switch needs just <strong>2 vCPUs and 2GB RAM</strong>, so the environment runs on any system with adequate resources.`,
        `Emits realistic <strong>Slingshot telemetry</strong> into <strong>Kafka</strong> topics, stress-testing the monitoring data pipelines (<strong>OpenSearch Alerting</strong>, <strong>Grafana Alerting</strong>) at scale without physical hardware.`,
        `Automates the full lifecycle of the simulation environment. Starts the <strong>FMN</strong> on the admin node, pushes its public key to compute nodes, registers simulated nodes as <strong>HPCM</strong> nodes, and enables telemetry - a complete mock of real hardware. Validated against <strong>Frontier-scale</strong> systems; slated to become an internal <strong>HPE</strong> tool across teams and business units.`,
        `working with the <strong>Ceph</strong> team, focusing on <strong>exascale distributed storage</strong>. Built <strong>Ceph integrations</strong> with multiple downstream security services to strengthen security capabilities within <strong>NGSM</strong>, and am expanding into <strong>Ceph monitoring and observability</strong> for large-scale HPC environments.`,
      ],
      signals: 'EXASCALE · SLINGSHOT · KAFKA · VICTORIA METRICS · GRAFANA · OPENSEARCH · CEPH · DOCKER · SECURITY',
      flagship: true,
    },

    {
      num: '02',
      title: 'VYUHA · Security Research',
      role: 'OFFENSIVE SECURITY RESEARCH',
      dates: 'JAN 2026 — MAY 2026',
      location: 'AFFILIATION · THWS, GERMANY',
      oneLiner:
        'Led the <strong>offensive-security research</strong> track for an adaptive <strong>EDR evaluation framework</strong>.',
      patent: 'PATENT · ACCEPTED IN INDIA',
      narrative:
        "Led the offensive-security research track for <strong>VYUHA</strong>, an adaptive <strong>EDR evaluation framework</strong> implemented in <strong>C++</strong>. The goal was to study the <strong>newest attack techniques</strong> used to evade modern endpoint defenses — implementing proof-of-concepts from recent security research and integrating them into a unified framework so we could systematically test <em>where EDRs see and where they don't</em>, and ultimately strengthen the defense. VYUHA combines four cross-layer attack primitives with a <strong>Deep Q-Network strategy selector</strong> that adapts technique selection to each product's observed responses.",
      contributions: [
        `Built a <strong>BYOVD engine</strong> using <strong>CVE-2023-52271</strong> in a legitimately signed kernel driver where the driver is already trusted by the OS, so operations run from kernel context, below the visibility of user-mode EDR hooks. Used to terminate EDR processes and study how kernel-level trust gets abused.`,
        `Built <strong>EDR-Freeze</strong>, exploiting a <strong>Windows Error Reporting</strong> race condition to suspend EDR threads through the signed system binary <strong>WerFault</strong> - no unsigned code, no injection, nothing for file-based detection to flag.`,
        `Built a <strong>Crystal Palace</strong> reflective loader with <strong>six evasion layers</strong> for in-memory payload execution which is mapped entirely in memory, never touching disk, defeating file-based scanning; <strong>KaplaStrike</strong>-produced PIC blobs add layers that resist static analysis and memory inspection.`,
        `Built a <strong>SysWhispers4</strong> direct syscall engine with <strong>six SSN resolution strategies</strong> (<strong>FreshyCalls</strong>) that bypasses user-mode API hooks by invoking NT syscalls directly, so EDRs that hook <em>Nt*</em> functions in user mode never observe the call. This proved the weakest defensive layer across all tested products with <strong>27% mean detection rate</strong>.`,
        `Studied low-level <strong>Windows internals</strong> spanning process execution, memory operations (<em>NtAllocateVirtualMemory</em>, <em>NtProtectVirtualMemory</em>), thread suspension, and how endpoint telemetry is generated and correlated at the kernel/user boundary.`,
        `Built a <strong>DQN strategy selector</strong> that adapts technique selection to each product's observed responses — <strong>SHAP</strong> explainability identifies which system properties drive technique selection, <strong>K-means</strong> clustering characterizes EDR defensive postures, transfer learning reuses policies across products. Evaluated against <strong>Microsoft Defender</strong>, <strong>SentinelOne</strong>, <strong>OpenEDR</strong>, <strong>Huntress</strong>, and <strong>Trend Micro Apex One</strong> across <strong>60 attack instances</strong>.`,
      ],
      signals: 'WINDOWS INTERNALS · C++ · EDR · SYSCALLS · BYOVD · REFLECTIVE LOADING · EDR FREEZE · DQN · TRANSFER LEARNING',
      link: { label: 'GITHUB · VYUHA ↗', href: 'https://github.com/BipinRajC/EDR-Adaptive-Framework' },
      dossier: true,
    },

    {
      num: '03',
      title: 'Namma Pothole',
      role: 'CO-FOUNDER / BUILDER',
      dates: 'SEP 2025 — PRESENT',
      location: 'BANGALORE, INDIA',
      oneLiner:
        'Civic-tech platform turning <strong>citizen reports</strong> into <strong>real road repairs</strong> in Bangalore.',
      narrative:
        'Co-founded <strong>Namma Pothole</strong>, a civic-tech platform for identifying and resolving potholes and road-infrastructure problems. <strong>~1,500 citizen reports</strong> filed, working with <strong>GBA</strong> to get reported potholes resolved on the ground. Fully cloud-native on <strong>Azure</strong> — Container Apps for backend, frontend, and Redis; a <strong>FastAPI</strong> backend; <strong>MongoDB</strong> for report schemas; Supabase S3 for pothole images; and a <strong>WABA WhatsApp bot</strong> for intake. <strong>GeoJSON</strong> calculations surface the nearest reported pothole to each citizen, with client-side distance computation.',
      aiValidation:
        'Built a two-stage <strong>AI validation pipeline</strong> — a <strong>CLIP ViT-B/32</strong> model filters non-road imagery, then a fine-tuned <strong>EfficientNet-V2-S</strong> classifier detects potholes. Retraining improved accuracy from <strong>88.89% to 90.74%</strong> and pothole recall from <strong>89.66% to 96.55%</strong>.',
      chain: ['SOFTWARE', 'CITIZEN REPORTS', 'COORDINATION', 'PHYSICAL-WORLD OUTCOMES'],
      link: { label: 'NAMMA POTHOLE ↗', href: 'https://nammapothole.com/' },
      signals: 'AZURE · FASTAPI · REDIS · MONGODB · WHATSAPP BOT · GEOJSON · CLIP · EFFICIENTNET',
    },

    {
      num: '04',
      title: 'IIT Bombay TrustLab',
      role: 'TEACHING ASSISTANT · CRYPTOGRAPHY',
      dates: 'JUN 2025 — DEC 2025',
      location: '',
      oneLiner:
        "Built and maintained <strong>containerized cryptography labs</strong> for <strong>IIT Bombay's TrustLab</strong>.",
      narrative:
        "Designed and containerized hands-on cryptography labs using <strong>Docker</strong>, integrated into IIT Bombay's <strong>cLabs platform</strong> so students could spin up isolated, reproducible environments. Structured exercises for reliable execution, debugged lab workflows, fixed <strong>autograder</strong> edge cases, and stress-tested solutions to keep everything stable in production. Supported a diverse cohort of students and working IT professionals aged roughly <strong>18–45</strong> with technical guidance, hand-holding and review across multiple lab sessions.",
      signals: 'DOCKER · CLABS · CRYPTOGRAPHY · LINUX · AUTOMATION',
    },

    {
      num: '05',
      title: 'HPE Internship',
      role: 'SECURITY / SYSTEMS ENGINEERING INTERN',
      dates: 'FEB 2025 — FEB 2026',
      location: '',
      oneLiner:
        'Built an enterprise-grade <strong>security compliance framework</strong> for <strong>HPC systems</strong>.',
      narrative:
        'Designed an end-to-end <strong>security compliance framework</strong> for HPC systems — an enterprise <strong>TUI</strong> for <strong>OpenSCAP</strong> compliance scanning, remediation, and rollback across <strong>Linux nodes</strong>.',
      contributions: [
        `Built an enterprise <strong>TUI</strong> for <strong>OpenSCAP</strong> compliance scanning, remediation, and rollback across Linux nodes.`,
        `<strong>SSH</strong> into nodes within an HPC environment, running detailed compliance scans across multiple profiles (<strong>CIS</strong>, <strong>NIST</strong>, other baselines), generating compliance scores, and explaining why systems are non-compliant.`,
        `Per-issue remediation guidance with remote remediation over <strong>SSH</strong>; system state tracked with version history in <strong>PostgreSQL</strong>, with rollback to previous states if remediation caused instability.`,
        `<strong>HTML, PDF, and XML reporting</strong> for internal audits and compliance verification.`,
        `Integrated <strong>Groq LLM</strong> to automate alert-to-remediation conversion and accelerate incident response.`,
      ],
      link: { label: 'GITHUB · RULEGUARD ↗', href: 'https://github.com/BipinRajC/RuleGuard' },
      signals: 'GO · POSTGRESQL · WAZUH · OPENSCAP · LYNIS · GROQ LLM · SSH · LINUX',
    },
  ],
};
