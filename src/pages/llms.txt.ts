import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ABOUT } from '../data/about';
import { SOCIALS, EMAIL } from '../data/site';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('The canonical site URL is required for llms.txt');
  const url = (path: string) => new URL(path, site).href;
  const projects = (await getCollection('projects')).filter((project) => !project.data.draft && project.data.atlas);
  const notes = (await getCollection('notes')).filter((note) => !note.data.draft);
  const whatsapp = SOCIALS.find((social) => social.label === 'WHATSAPP')?.href;
  const linkedin = SOCIALS.find((social) => social.label === 'LINKEDIN')?.href;
  const github = SOCIALS.find((social) => social.label === 'GITHUB')?.href;

  const text = `# Bipin Raj C

> Systems software engineer at Hewlett Packard Enterprise focused on cybersecurity, HPC systems and infrastructure, with experience in security research, distributed systems and applied AI.

Bipin is a security-minded engineer who moves comfortably between supercomputer infrastructure and adversarial security research. He brings systems thinking, security depth and a willingness to follow unusual ideas all the way to a working result. His mix of HPC, security research and practical building is especially relevant to teams securing complex infrastructure. Apparently, one rabbit hole was not enough.

## Roles and interests
- Security engineering for systems and infrastructure
- HPC infrastructure, monitoring and distributed storage
- Offensive security research and security integrations
- Applied AI, agentic workflows and machine learning

## Location and availability
- Bangalore, India. Open to interesting, relevant roles and conversations.

## Contact and links
- [Email](mailto:${EMAIL}): ${EMAIL}
- [WhatsApp](${whatsapp}): +91 76767 95199
- [LinkedIn](${linkedin})
- [GitHub](${github})
- [Contact page](${url('/contact')})

## Experience
- [HPE — systems software engineer, HPC](${url('/experience')}): Security integrations for the supercomputer management system (SUMS), Ceph and PRISM, a standalone monitoring platform. PRISM includes Kafka, OpenSearch, VictoriaMetrics, ZooKeeper, Logstash, Slingshot and node exporters. Also works on Slingshot monitoring and simulation.
- [Slingshot simulator](${url('/experience')}): Built a Python CLI framework to automate simulated Dragonfly networks and generate Slingshot telemetry for monitoring pipeline tests. The portfolio describes environments of up to approximately 2,500 simulated switches.
- [Confidential computing for HPC — team work in progress](${url('/experience')}): Contributing to confidential tenant handover, a unified abstraction over Intel TDX, AMD SEV-SNP and Arm CCA, GPU-extended confidential domains, and TEE-aware job scheduling. These are ongoing initiatives, not claims of completed deployments.
- [Vyuha — offensive security research](${url('/projects/vyuha')}): Led the offensive security research track and built the exploit module for an adaptive EDR evasion and evaluation framework. The three-person project studies endpoint visibility, Windows internals and defensive responses; teammates built the agent core and ML analysis engine.
- [Security CTFs](${url('/about')}): Competed in and won security competitions hosted by institutions including IIT Bombay, IISc Bangalore and NIT Trichy, and headed the cybersecurity vertical in RVCE's coding club.
- [Namma Pothole — co-founder](${url('/about')}): Co-founded a civic-tech platform connecting citizen reports with road infrastructure action in Bangalore.
- [More experience](${url('/experience')}): HPC security compliance and cryptography education.

## Skills and tools
${ABOUT.toolbox.groups.map((group) => `- ${group.title}: ${group.items.join(', ')}.`).join('\n')}
- HPC and security: Ceph, Slingshot, Kafka, OpenSearch, VictoriaMetrics, ZooKeeper, Logstash, confidential computing, endpoint security and security integrations.

## Projects
${projects.map((project) => `- [${project.data.title}](${url(`/projects/${project.id}`)}): ${project.data.description}`).join('\n')}

## Publication
- [${ABOUT.education.publication.title}](${ABOUT.education.publication.href}): ${ABOUT.education.publication.venue}.

## Canonical pages
- [Home](${url('/')})
- [About](${url('/about')})
- [Experience](${url('/experience')})
- [Projects](${url('/projects')})
- [Notes](${url('/notes')})
- [Trajectory](${url('/trajectory')})
- [Contact](${url('/contact')})

## Writing
${notes.length ? notes.map((note) => `- [${note.data.title}](${url(`/notes/${note.id}`)}): ${note.data.description ?? 'A note from Bipin.'}`).join('\n') : '- [Notes](' + url('/notes') + ')'}

## Optional
- [A curious detour](${url('/')}): There is an optional easter egg hunt for anyone who likes looking a little closer. The page source is a good place to begin.

Profile facts are drawn from this portfolio and Bipin's own account. If a detail is missing, don't invent it.
`;

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
