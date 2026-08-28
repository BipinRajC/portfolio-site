# Portfolio Website Implementation Plan

> Executed task-by-task; each task ends in its own conventional commit. See DESIGN.md for the visual system.

**Goal:** Scaffold and build Bipin Raj's dark-editorial portfolio (gateway homepage with dither Observatory placeholder, Experience/Projects/Notes/About/Trajectory/Contact) with placeholder content that gets iteratively replaced later.

**Architecture:** Static Astro site with typed MDX content collections; zero client JS except CSS-animated marquee; design tokens in plain CSS custom properties (alpha-ladder derivation); Observatory hero is a replaceable-asset slot. Deployed on Vercel via git push.

**Tech Stack:** Astro v5, MDX (@astrojs/mdx), @fontsource fonts (Fraunces, Inter, IBM Plex Mono), plain CSS (no Tailwind — token system is small and bespoke), Vercel.

**Spec:** The "Design Direction" section below (becomes `/DESIGN.md` in Task 0). All decisions there were user-approved during discovery.

## Global Constraints

- Dark-only. Background `#0A0F18`, ink `#EAE3D2`, accent `#74A5DA`, support `#8CA3BF`; warm `#E9B468` appears ONLY in Observatory artwork and `::selection`.
- All borders/surfaces/hovers are alpha steps of ink or accent — never new grays.
- Fonts: Fraunces (display/titles), Inter (body/UI), IBM Plex Mono (metadata/labels). No other fonts (Departure Mono micro-labels are a later, optional task).
- Motion inventory (complete): marquee drift, border/alpha hover steps, one page-enter fade. Everything inside `@media (prefers-reduced-motion: no-preference)`.
- No: light mode, glassmorphism, neon/cyberpunk, Matrix/terminal clichés, scroll-jacking, contact forms, CMS/database, hardcoded blog posts in components.
- All copy in this plan is PLACEHOLDER — mark placeholder content with `draft: false` but obviously-replaceable wording; user supplies real copy later.
- Commits: 1–2 line conventional messages (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `optimize:`); one concern per commit; push after each task.
- Verification per task: `npm run build` must pass; visually inspect changed pages via dev server before committing.
- HPE work appears only under Experience; ThermoRL, Confidential-Aware Multitenancy, Vyuha, Brain Overflow, FootyQuant only under Projects.

---

## Design Direction (spec — user-approved in discovery)

### Visual language
Four voices, one job each: (1) refined brutalist structure — hairline borders, exposed grid, numbered rows, mono labels; (2) editorial typography — serif display / sans body / mono metadata; (3) fine-grain dither illustration (Hacktron-style stipple, NOT chunky retro pixels) as the site's only image language; (4) cosmic dark atmosphere strictly behind the content plane (faint stars + nebula tint behind hero only). Scrapbook/sketch marginalia allowed only in About and Trajectory. Cut: neo-classical, cartoonish neo-brutalism.

### Color story
Cold instrument world; the Observatory's amber window is the only warm light (plus text selection). Chosen by user from A/B mockups (cool-primary won).

### Homepage (validated via full mockup)
~2.5 viewports: slim nav (serif name + 6 mono links, no CTA) → split hero (left ~56%: mono kicker `SYSTEMS · STORAGE · INFRASTRUCTURE`, large Fraunces statement, one sans role line, 2-line mono NOW/EXPLORING readout with accent dots, labeled social links GITHUB/LINKEDIN/INSTAGRAM/EMAIL) (right ~44%: Observatory slot) → hybrid domain+tech marquee strip → SELECTED WORK: exactly 3 rows (`num · serif title · one-liner · mono tag →`) → live INDEX (serif section title + one-line description + live mono metadata, e.g. `12 NOTES · LAST MAY 2026 →`) → "Say hello." contact block → instrument footer (role left, `BLR, IN · 12.97°N 77.59°E` right).

### Builder's Observatory
Placeholder-first: dither-textured panel (CSS dot grid) with blocked desk/monitors/warm round window + caption `BUILDER'S OBSERVATORY — FINAL DITHER ARTWORK`. Final art later: original high-detail fine-dither duotone illustration (ivory-on-dark, warm window glow) of a lived-in multi-monitor workspace with observatory window to stars; editorial/technical/human; no project references, no hoodie-hacker. Artwork is a replaceable asset (single component swap); selective animation decided after art exists.

### Sections
- **Experience** (`/experience`): editorial case blocks per area (Ceph/NGSM autonomous storage orchestration; Slingshot simulator/monitoring): mono role+timeline header, short narrative, "what I built" list, mono tech tags.
- **Projects** (`/projects`, `/projects/[slug]`): index rows → MDX case pages. Frontmatter: title, description, date, status, tags, tech, links, featured. Project images get duotone dither treatment (later).
- **Notes** (`/notes`, `/notes/[slug]`): date-first chronological list; MDX; workflow = add file → push → deployed.
- **Trajectory** (`/trajectory`): subtitle credits the Impossible List concept; categories Build/Learn/Explore/Experience/Someday; done items get **date + evidence link** (no strikethrough); mono per-category counters.
- **About** (`/about`): serif-led editorial, personal not résumé.
- **Contact** (`/contact`): email + socials, no form.
- **404**: empty observatory ("Nothing at these coordinates.").

### Type scale & grid
Fluid clamp() scale — display ~clamp(2.2rem,5vw,3.5rem); h2 ~1.6rem; body 1rem/1.65; metadata 0.72rem mono with 0.12–0.22em letterspacing. Content max-width 1140px, 4px spacing base, section padding ~96px desktop / 56px mobile. Hairline dividers `--line` everywhere; no cards with fills except Observatory panel.

### Mobile
Hero stacks statement-first; Observatory below (never above the name), re-cropped shorter; strip stays; work/index rows wrap to two lines; nav becomes a labeled wrap (no hamburger for v1 — 6 short mono links fit on two lines).

---

## Tasks

### Task 0: Repo docs — DESIGN.md, plan.md, .gitignore

**Files:**
- Create: `DESIGN.md` (the Design Direction section above, expanded with the token table from Task 2, motion inventory, DO-NOT list)
- Create: `plan.md` (this plan)
- Modify: `.gitignore` (currently empty)

**Steps:**
- [ ] Write `DESIGN.md` from the spec section above (principles, references + learnings, tokens, typography, spacing/grid, motion inventory, Observatory spec, background spec, accessibility rules, explicit DO-NOT list).
- [ ] Write `plan.md` (this document).
- [ ] `.gitignore`: add `node_modules/`, `dist/`, `.astro/`, `.superpowers/`, `.vercel/`, `.DS_Store`.
- [ ] Commit: `docs: add design system and implementation plan` — push.

### Task 1: Astro scaffold

**Files:**
- Create: Astro project in repo root (`package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` stub, `public/`)

**Steps:**
- [ ] `npm create astro@latest . -- --template minimal --typescript strict --no-git --no-install` (empty-dir prompts: proceed in place), then `npm install`.
- [ ] Add integrations: `npx astro add mdx --yes`. Install fonts + checker: `npm i @fontsource-variable/fraunces @fontsource-variable/inter @fontsource/ibm-plex-mono && npm i -D @astrojs/check typescript`.
- [ ] Add `"check": "astro check"` script. Run: `npm run build` → expect clean build; `npm run dev` → stub renders.
- [ ] Commit: `chore: scaffold astro project with mdx and fonts` — push.

### Task 2: Design tokens + global styles

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`

**Interfaces:**
- Produces: CSS custom properties consumed by every later task — exact names below.

- [ ] **tokens.css:**

```css
:root {
  /* environment */
  --bg-deep: #0A0F18;
  --bg-panel: #0D1420;
  --ink: #EAE3D2;
  --accent: #74A5DA;
  --support: #8CA3BF;
  --warm: #E9B468; /* Observatory + ::selection ONLY */

  /* alpha ladder — the only permitted derived colors */
  --ink-muted: rgba(234, 227, 210, 0.62);
  --ink-faint: rgba(234, 227, 210, 0.40);
  --line: rgba(234, 227, 210, 0.11);
  --line-strong: rgba(234, 227, 210, 0.22);
  --accent-underline: rgba(116, 165, 218, 0.40);
  --accent-wash: rgba(116, 165, 218, 0.05);
  --warm-glow: rgba(233, 180, 104, 0.35);

  /* type */
  --font-serif: 'Fraunces Variable', Georgia, serif;
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
  --text-display: clamp(2.2rem, 5vw, 3.5rem);
  --text-title: clamp(1.35rem, 2.5vw, 1.6rem);
  --text-body: 1rem;
  --text-small: 0.8rem;
  --text-meta: 0.72rem;
  --track-meta: 0.14em;
  --track-kicker: 0.22em;

  /* layout */
  --max-w: 1140px;
  --space-section: clamp(3.5rem, 8vw, 6rem);
  --pad-x: clamp(1.25rem, 4vw, 2.25rem);
}
```

- [ ] **global.css:** import the three @fontsource packages + tokens.css; reset; `body { background: var(--bg-deep); color: var(--ink); font-family: var(--font-sans); line-height: 1.65; }`; `::selection { background: var(--warm); color: var(--bg-deep); }`; base link style (accent, `border-bottom: 1px solid var(--accent-underline)`, hover → solid); utility classes `.mono` (font, size meta, tracking, uppercase), `.serif`, `.kicker` (mono + `color: var(--support)` + tracking-kicker), `.wrap` (max-w + pad-x + margin auto); page-enter fade: `@media (prefers-reduced-motion: no-preference) { main { animation: enter 0.3s ease both; } @keyframes enter { from { opacity: 0; transform: translateY(4px); } } }`.
- [ ] Import global.css in `index.astro` temporarily; view dev server: dark bg, ivory text, warm selection.
- [ ] `npm run build` → clean. Commit: `feat: add design tokens and global styles` — push.

### Task 3: Base layout, Nav, Footer

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro` (use Base)

**Interfaces:**
- Produces: `Base.astro` props `{ title: string; description?: string }`; slots page content into `<main>`. All pages consume this.

**Steps:**
- [ ] `Base.astro`: html lang=en, head (charset, viewport, title `${title} — Bipin Raj`, description meta, global.css import), body → `<Nav />` `<main><slot /></main>` `<Footer />`.
- [ ] `Nav.astro`: `.wrap` flex row, serif "Bipin Raj" linking `/`, right: mono links EXPERIENCE / PROJECTS / NOTES / ABOUT / TRAJECTORY / CONTACT (`aria-current="page"` → accent color, set via `Astro.url.pathname` startsWith check). Bottom `1px solid var(--line)`. Wraps to two lines on mobile (flex-wrap) — no hamburger.
- [ ] `Footer.astro`: top hairline, `.wrap` flex between, mono faint: `BIPIN RAJ — SYSTEMS SOFTWARE ENGINEER` | `BLR, IN · 12.97°N 77.59°E`.
- [ ] Rebuild index.astro as empty Base shell; verify nav/footer at desktop + 375px width. Build passes.
- [ ] Commit: `feat: add base layout with nav and instrument footer` — push.

### Task 4: Content collections + placeholder content

**Files:**
- Create: `src/content.config.ts`, `src/content/projects/thermorl.mdx` (+ `vyuha.mdx`, `footyquant.mdx`, `brain-overflow.mdx`, `confidential-multitenancy.mdx`), `src/content/notes/hello-world.mdx`, `src/data/trajectory.yaml`, `src/data/now.json`, `src/data/site.ts`

**Interfaces:**
- Produces: collections `projects`, `notes` via `getCollection`; `SOCIALS`, `DOMAINS` exports from `site.ts`; `now.json` shape `{ now: string; exploring: string }`; trajectory YAML shape below. Consumed by Tasks 5–11.

- [ ] **content.config.ts:**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'research', 'shipped', 'paused']),
    tags: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
    links: z.object({ github: z.string().url().optional(), paper: z.string().url().optional(), demo: z.string().url().optional() }).default({}),
    featured: z.number().optional(), // 1..3 → homepage Selected Work order
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
```

- [ ] **site.ts:** `export const SOCIALS = [{ label: 'GITHUB', href: 'https://github.com/BipinRajC' }, { label: 'LINKEDIN', href: '<PLACEHOLDER>' }, { label: 'INSTAGRAM', href: '<PLACEHOLDER>' }, { label: 'EMAIL', href: 'mailto:bipinraj.4604@gmail.com' }];` and `export const DOMAINS = ['EXASCALE HPC','CEPH','DISTRIBUTED SYSTEMS','THERMAL-AWARE SCHEDULING','NETWORKING','KAFKA','REINFORCEMENT LEARNING','LINUX','DOCKER','SECURITY'];` (user refines lists later).
- [ ] Placeholder MDX per project — real names, one-line honest descriptions from discovery brief, `status`/`tags`/`tech` best-guess, `featured: 1|2|3` on ThermoRL/Vyuha/FootyQuant, body = one short placeholder paragraph noting detailed case study coming. `hello-world.mdx` note: one paragraph on how the notes pipeline works (genuine content, doubles as pipeline test).
- [ ] **trajectory.yaml:** categories `build/learn/explore/experience/someday`, each `{ title, items: [{ text, done?: 'YYYY-MM-DD', evidence?: url }] }` — seed 2–3 obviously-placeholder items each. **now.json:** `{ "now": "self-healing Ceph orchestration at exascale", "exploring": "thermal-aware scheduling for AI datacenters" }`.
- [ ] `npm run check && npm run build` → schemas validate. Commit: `feat: add content collections with placeholder content` — push.

### Task 5: Observatory placeholder component

**Files:**
- Create: `src/components/Observatory.astro`

**Interfaces:**
- Produces: `<Observatory />` — self-contained, no props; the ONLY thing that changes when final art lands is this component's internals (swap to `<Image>` of the artwork). Consumed by Task 6 hero.

**Steps:**
- [ ] Panel: `background: var(--bg-panel)`, `border: 1px solid var(--line)`, dither texture `background-image: radial-gradient(rgba(234,227,210,0.13) 0.8px, transparent 0.8px); background-size: 4px 4px;`, min-height 380px desktop. Blocked composition (absolutely positioned divs): warm round window top-right (radial-gradient `--warm-glow` + border), three monitor rects (left one with `--warm-glow` fill at 0.16), desk line, centered mono caption `BUILDER'S OBSERVATORY — FINAL DITHER ARTWORK`. `aria-hidden="true"` on decorative internals; container `role="img"` `aria-label="Illustration placeholder: a builder's workspace beneath an observatory window"`.
- [ ] Visual check at desktop and ~360px (shorter min-height 240px via media query).
- [ ] Build passes. Commit: `feat: add builder observatory placeholder` — push.

### Task 6: Homepage hero + domain strip

**Files:**
- Create: `src/components/Hero.astro`, `src/components/DomainStrip.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Observatory`, `SOCIALS`, `DOMAINS`, `now.json`.

**Steps:**
- [ ] `Hero.astro`: grid `56% / 44%` (stacks at <900px, text first), `.wrap` padding. Left: kicker `SYSTEMS · STORAGE · INFRASTRUCTURE`; h1 serif display "Building autonomous storage for machines the size of warehouses." (PLACEHOLDER — user rewrites); sans lede "Systems Software Engineer at Hewlett Packard Enterprise — distributed storage, orchestration, and exascale HPC."; NOW readout: mono small, `border-left: 2px solid var(--accent)`, two lines from now.json (`● NOW — {now}` / `● EXPLORING — {exploring}`, dots accent); socials row from SOCIALS (mono accent links with underline, external `target="_blank" rel="noopener"`). Atmosphere on hero section only: the faint star field + nebula radial-gradient stack from the approved mockup as `background` on the hero `<section>`.
- [ ] `DomainStrip.astro`: hairline top+bottom band; inner track = DOMAINS joined with ` · `, duplicated twice for seamless loop; CSS `@keyframes marquee { to { transform: translateX(-50%); } }` at ~40s linear infinite inside `prefers-reduced-motion: no-preference`; reduced-motion fallback: static single copy, `overflow: hidden`. `aria-hidden="true"` on the duplicate copy.
- [ ] Assemble index.astro: Hero → DomainStrip. Verify: marquee drifts slowly; with OS reduced-motion emulation it is static; mobile stacks correctly.
- [ ] Build passes. Commit: `feat: add homepage hero and domain strip` — push.

### Task 7: Selected work rows + live index + contact block

**Files:**
- Create: `src/components/WorkRow.astro`, `src/components/IndexRow.astro`, `src/components/SectionLabel.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `getCollection('projects')`, `getCollection('notes')`, trajectory.yaml.
- Produces: `WorkRow` props `{ num: string; title: string; description: string; tag: string; href: string }`; `IndexRow` props `{ title: string; description: string; meta: string; href: string }` (meta accepts `<b>` for accent spans); `SectionLabel` props `{ text: string }` — reused on section pages.

**Steps:**
- [ ] `SectionLabel`: mono kicker-style label. `WorkRow`: baseline flex, hairline top border, mono num (support), serif title, sans one-liner (muted, flex 1), mono tag+→ (accent); whole row is the link, hover `background: var(--accent-wash)`.
- [ ] `IndexRow`: grid `200px 1fr auto` (mobile: two lines), serif title ~1.6rem, muted description, right-aligned mono meta with accent `<b>`s; hairline top border; hover wash.
- [ ] index.astro additions: SELECTED WORK = projects where `featured` set, sorted by featured, exactly 3, → WorkRows (tag = uppercased first tag or status). INDEX = five IndexRows with computed metadata: Experience `HPE · 2023—NOW →` (static string in site.ts), Projects `${count} ENTRIES · LATEST ${latest.title.toUpperCase()} →`, Notes `${count} NOTES · LAST ${MMM YYYY} →`, Trajectory `${total} OBJECTIVES · ${done} DONE →` (computed from yaml), About `→`. Contact block: serif "Say hello." + email + socials mono row. Filter `draft: true` everywhere.
- [ ] Verify homepage top-to-bottom against approved mockup; mobile pass. Build passes.
- [ ] Commit: `feat: add selected work, live index, and contact block` — push.

### Task 8: Notes — index + post pages (the MDX pipeline)

**Files:**
- Create: `src/pages/notes/index.astro`, `src/pages/notes/[slug].astro`, `src/styles/prose.css`

**Interfaces:**
- Produces: `prose.css` (`.prose` class — serif-friendly long-form styles) reused by project pages (Task 9).

**Steps:**
- [ ] `prose.css`: `.prose` — max-width 68ch; h2/h3 Fraunces; body Inter 1.0625rem/1.7; links accent-underlined; `code` mono on `--bg-panel`; `pre` panel bg + hairline border + padding; blockquote accent left border; hr = `--line`.
- [ ] Notes index: SectionLabel `NOTES`, serif h1 + one-line description ("Rabbit holes, experiments, things learned." — placeholder); chronological list rows: mono date `YYYY-MM-DD` (support), serif title (link), optional mono first tag right. Sort desc, filter drafts.
- [ ] `[slug].astro`: `getStaticPaths` from collection; header (mono date + tags, serif title), `<Content />` in `.prose`; back-link `← NOTES`.
- [ ] End-to-end pipeline check: `hello-world` renders at `/notes/hello-world`; add a temp second MDX file, `npm run build`, confirm it appears in index + own page, then delete temp file.
- [ ] Commit: `feat: add mdx notes system with index and post pages` — push.

### Task 9: Projects — index + case-study pages

**Files:**
- Create: `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`

**Steps:**
- [ ] Projects index: SectionLabel `PROJECTS`, serif h1, description line ("Independent builds and research." — placeholder); all non-draft projects as WorkRows (num = 01..N by date desc).
- [ ] `[slug].astro`: header block — serif title, sans description, mono metadata line `{STATUS} · {MMM YYYY} · {tech.join(' · ')}`, links row (GITHUB ↗ / PAPER ↗ / DEMO ↗ when present, accent mono); body `<Content />` in `.prose`; back-link `← PROJECTS`.
- [ ] Verify all 5 placeholder projects build and render; ThermoRL page shows status/tech/links treatment.
- [ ] Commit: `feat: add projects index and case study pages` — push.

### Task 10: Experience page

**Files:**
- Create: `src/pages/experience.astro`

**Steps:**
- [ ] Header: SectionLabel `EXPERIENCE`, serif h1, mono line `HEWLETT PACKARD ENTERPRISE · SYSTEMS SOFTWARE ENGINEER · 2023—NOW` (user corrects dates later).
- [ ] Two case blocks (structure real, prose placeholder from discovery brief): **Autonomous Storage Orchestration** — narrative para on Ceph/CRUSH/NGSM self-healing at exascale; "WHAT I BUILT" mono label + 2–3 li placeholders; tech tag row (mono: CEPH · CRUSH · NGSM · HPC). **Slingshot Simulation & Monitoring** — narrative on simulated-switch orchestration CLI for large-scale non-destructive testing; same substructure (SLINGSHOT · DRAGONFLY · DOCKER · KAFKA · VICTORIAMETRICS). Blocks separated by hairlines; generous spacing. Mark placeholder paragraphs with an HTML comment `<!-- PLACEHOLDER: replace with final copy -->`.
- [ ] Verify structure scans well at both widths. Build passes.
- [ ] Commit: `feat: add experience page structure` — push.

### Task 11: Trajectory page

**Files:**
- Create: `src/pages/trajectory.astro`

**Steps:**
- [ ] Header: SectionLabel `TRAJECTORY`, serif h1, sans subtitle: "A living record of things not yet done — inspired by the Impossible List." with link to diogotc.com/impossiblelist.
- [ ] Load trajectory.yaml. Per category: serif h2 + mono counter `{done}/{total}`; item list — undone: plain sans muted; done: ink + mono accent date `(2026-01-22)` + optional `EVIDENCE ↗` link. No strikethroughs, no checkboxes.
- [ ] Verify counters compute correctly against yaml seed data. Build passes.
- [ ] Commit: `feat: add trajectory page with living goals list` — push.

### Task 12: About + Contact + 404

**Files:**
- Create: `src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/404.astro`

**Steps:**
- [ ] About: serif-led editorial layout — large serif opening line, 2–3 `.prose` placeholder paragraphs (curiosity/building/space/nature themes flagged `<!-- PLACEHOLDER -->`); leave a clearly-commented slot for future marginalia/sketch fragments (not built now — YAGNI).
- [ ] Contact: serif "Say hello.", one sans line, mono list: EMAIL / GITHUB / LINKEDIN / INSTAGRAM from SOCIALS. No form.
- [ ] 404: centered — serif "Nothing at these coordinates." + mono `ERR 404 — OBJECT NOT FOUND` + link `← HOME`; reuse hero star-field background.
- [ ] Build passes; `/404` renders via dev server. Commit: `feat: add about, contact, and 404 pages` — push.

### Task 13: SEO, meta, favicon, sitemap

**Files:**
- Modify: `src/layouts/Base.astro`, `astro.config.mjs`
- Create: `public/favicon.svg`, `src/components/seo` inline in Base (no separate file needed)

**Steps:**
- [ ] Base head: canonical URL, OG (`og:title/description/type/url`) + `twitter:card summary`, `theme-color #0A0F18`. Set `site` in astro.config (placeholder `https://portfolio-site.vercel.app` — updated when domain known). `npx astro add sitemap --yes`.
- [ ] `favicon.svg`: minimal — `#0A0F18` rounded square, single `#E9B468` dot upper-right (the observatory window), tiny ivory dither dots. Hand-write the SVG (~10 elements).
- [ ] Build; inspect head output in `dist/index.html`; sitemap emitted. Commit: `feat: add seo meta, sitemap, and favicon` — push.

### Task 14: Accessibility + performance pass

**Files:**
- Modify: whatever the audit flags (expect: contrast tweaks, focus styles, heading order)

**Steps:**
- [ ] Add visible `:focus-visible` outline (`2px solid var(--accent)`, offset 2px) globally; keyboard-walk every page.
- [ ] Verify contrast: `--ink-muted` on `--bg-deep` ≥ 4.5:1 (rgba .62 ivory ≈ passes; bump to .66 if not), accent on bg ≥ 4.5:1 for text-sized uses; check with browser devtools contrast checker.
- [ ] Reduced-motion sweep: marquee static, page-enter fade off. Heading-order + landmark check (one h1/page, nav/main/footer).
- [ ] `npm run build && npx serve dist` → Lighthouse (or devtools) on `/`, `/notes/hello-world`: expect Performance ≥95, A11y ≥95; fix regressions found.
- [ ] Commit: `fix: accessibility and performance audit fixes` (or `optimize:` if perf-only) — push.

### Task 15: Vercel deployment

**Steps:**
- [ ] Confirm repo pushed to `github.com/BipinRajC/portfolio-site` main.
- [ ] **USER ACTION:** import repo in Vercel dashboard (framework auto-detects Astro; no adapter needed for static output). I supply exact click-path when we get here.
- [ ] Verify production URL renders all routes; update `site` in astro.config to the real URL. Commit: `chore: set production site url` — push; confirm auto-redeploy (this also proves the notes git-push-publish workflow).

### Task 16 (deferred — separate mini-plan when triggered): Observatory final artwork
Generate/curate the fine-dither duotone illustration per DESIGN.md spec → art direction iterations with user → swap into `Observatory.astro` as optimized `<Image>` → decide selective ambient animation (each animated element gets its own follow-up task) → `feat: add builder observatory artwork`. Also deferred: Departure Mono micro-label layer, project-image dither pipeline, marginalia treatment in About/Trajectory. None block launch.

---

## Iteration model (per user request)

Scaffold now with placeholder content clearly marked (`<!-- PLACEHOLDER -->` comments, obviously-interim copy). Then iterate in later sessions: real Experience/Projects/About copy from user → replace placeholders (content-only commits, `docs:`/`feat:` as appropriate); real Observatory art (Task 16); hero statement rewrite; domain-strip list refinement; more notes. The structure is stable; content and art keep improving.

## Verification (end-to-end)

- `npm run check && npm run build` green at every task boundary.
- Visual inspection of every changed page (desktop + ~375px) before each commit.
- Notes pipeline proven by adding/removing a temp MDX file (Task 8).
- Lighthouse ≥95 perf/a11y on key pages (Task 14).
- Production smoke-test after Vercel import (Task 15).
