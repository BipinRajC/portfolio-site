# DESIGN.md — Visual System Source of Truth

Personal portfolio of **Bipin Raj** — Systems Software Engineer, HPE.
This document is the single source of truth for every visual decision. If code and this document disagree, this document wins (or gets amended deliberately, in its own commit).

Status: v1, agreed during the discovery phase (2026-08-29) via reference research and browser mockups.

---

## 1. Design Principles

1. **Instantly readable, then memorable.** A visitor understands who Bipin is, what he builds, and where to find him within seconds. Personality never taxes comprehension.
2. **One confident idea per surface.** Every strong reference site (pi.dev, maggieappleton.com, earendil.com, hacktron.ai) wins through restraint plus a single strong idea — never stacked aesthetics.
3. **Brutalist skeleton, cosmic skin.** Atmosphere (stars, nebula tint) lives strictly *behind* the content plane. Everything on top has sharp edges, hairline borders, exposed structure. Depth comes from what's behind the glass, never blur/glow on UI.
4. **Four voices, one job each.**
   - *Refined brutalist structure* — hairline borders, exposed grid, numbered rows, mono labels.
   - *Editorial typography* — serif display, sans body, mono metadata.
   - *Fine-grain dither illustration* — the site's ONLY image language.
   - *Cosmic dark atmosphere* — deep blue-black environment, quiet stars.
5. **Cold instrument world, one warm light.** The entire UI is cool; warmth exists only inside the Builder's Observatory artwork (and text selection). The lamp in the dark is the human.
6. **Personality via detail, not sections.** Distinctiveness comes from the Observatory, typography, micro-labels, coordinates footer, live index metadata — never from adding more content blocks.
7. **Mysterious aesthetically, never navigationally.** Navigation, links, and social profiles are boring-clear. Atmosphere and art carry the mystery.
8. **Content lives in git.** Markdown/MDX in the repo; add file → push → deployed. No CMS, no database.

## 2. References and What We Took (and Didn't)

| Reference | Took | Rejected |
|---|---|---|
| krishnatejaswi-s.vercel.app | Row anatomy (`num · title · one-liner · mono meta →`), mono section labels, instant-identity hero, generous whitespace | Six stacked previews, stats row, "Book a call" CTA, generic tech ticker, Gruvbox preset palette |
| pi.dev | Alpha-ladder color derivation (all borders/surfaces = opacity steps of two colors), serif + mono pairing, dark structural confidence | Docs-product density, its exact blue-slate palette |
| maggieappleton.com | Typography-as-interface, role separation (serif display / sans UI), semantic warm "black" | Cream-first light mode, five candy accents |
| earendil.com | Strict motion budget (a complete motion system is ~3 animations), framed composition, slow cinematic restraint | Its emptiness (we have real content volume) |
| hacktron.ai | Fine-dither illustration confidence, quarantined art (framed, whitespace, never behind text), hue-cast near-black backgrounds | Michroma/sci-fi branding, all-mono body text, threat-severity color coding |
| diogotc.com/impossiblelist | Done = **date + evidence link** (no strikethrough), escalating sub-goals, quiet undone items | Unstyled wall-of-li flatness, diary-personal categories |

## 3. Color Tokens

Dark-only. No light mode.

```css
/* environment */
--bg-deep:  #0A0F18;  /* page background — blue-cast near-black */
--bg-panel: #0D1420;  /* Observatory panel, code blocks */
--ink:      #EAE3D2;  /* primary text — warm ivory, never #FFF */
--accent:   #74A5DA;  /* cool blue — links, active states, pointing */
--support:  #8CA3BF;  /* blue-gray — kickers, metadata, numbers */
--warm:     #E9B468;  /* amber — Observatory artwork + ::selection ONLY */

/* alpha ladder — the ONLY permitted derived colors */
--ink-muted:        rgba(234, 227, 210, 0.62);  /* secondary text */
--ink-faint:        rgba(234, 227, 210, 0.40);  /* footer, captions */
--line:             rgba(234, 227, 210, 0.11);  /* hairline borders */
--line-strong:      rgba(234, 227, 210, 0.22);  /* emphasized borders */
--accent-underline: rgba(116, 165, 218, 0.40);  /* link underlines */
--accent-wash:      rgba(116, 165, 218, 0.05);  /* row hover fill */
--warm-glow:        rgba(233, 180, 104, 0.35);  /* observatory window */
```

Rules:
- Never introduce a new gray/hex. New shades must be alpha steps of `--ink`, `--accent`, or `--warm` and must be added to this table first.
- `--warm` in UI is allowed in exactly three places: the Observatory artwork, `::selection`, and the contact sign-off name ("the human at the end of the cold instrument" — amended 2026-08-29). Nowhere else, ever.
- Contrast floors: body-size text ≥ 4.5:1 on `--bg-deep`; large serif display ≥ 3:1.

## 4. Typography

| Voice | Face | Used for |
|---|---|---|
| Serif | **Fraunces** (variable) | Name, headlines, page titles, project/note titles, big statements |
| Sans | **Inter** (variable) | Body, descriptions, UI text |
| Mono | **IBM Plex Mono** | Dates, tags, status, labels, nav links, metadata, the strip |

Chosen by the user from rendered A/B/C mockups (vs Newsreader, Instrument Serif).

Scale (fluid):
```css
--text-display: clamp(2.2rem, 5vw, 3.5rem);   /* hero h1 — Fraunces 400 */
--text-title:   clamp(1.35rem, 2.5vw, 1.6rem); /* h2 / index rows */
--text-body:    1rem;                           /* Inter, line-height 1.65 */
--text-small:   0.8rem;
--text-meta:    0.72rem;                        /* mono labels */
--track-meta:   0.14em;  /* mono letterspacing */
--track-kicker: 0.22em;  /* kickers/section labels */
```

Rules:
- Serif is 400/500 weight only — elegance from size and space, not boldness.
- Mono labels are uppercase + letterspaced. Sans is never letterspaced.
- Long-form prose (`.prose`): Inter 1.0625rem / 1.7, max-width 68ch; Fraunces headings.
- **Departure Mono** (`--font-pixel`, self-hosted, MIT) for ≤11px micro-labels only: the domain strip, figure captions, the footer. Pixel-flavored echo of the dither art. Never at body sizes (adopted 2026-08-29).

## 5. Spacing, Borders, Grid

- Base unit 4px. Section padding `--space-section: clamp(3.5rem, 8vw, 6rem)`.
- Content shell: `--max-w: 1140px`, horizontal padding `clamp(1.25rem, 4vw, 2.25rem)`.
- Borders are 1px hairlines (`--line`) — never thicker, never rounded beyond 2px, no box-shadows.
- Structure is exposed: rows divided by hairlines, sections by hairlines, the strip bounded by hairlines.
- No filled cards except the Observatory panel (`--bg-panel`). Everything else sits directly on the page.
- Hero grid: 56% text / 44% art on desktop; stacks text-first below 900px.

## 6. Motion

The complete motion inventory. Nothing else may animate:

1. **Domain strip drift** — marquee, ~55s linear loop, pauses on hover.
2. **Hover steps** — border/background alpha increases (`--line` → `--line-strong`, transparent → `--accent-wash`). 150ms ease.
3. **Page-enter fade** — main content, 300ms, opacity + 4px rise. Once per navigation.
4. **Sky breathing** — the two far-star sub-layers oscillate opacity on 13s/21s alternating cycles; the nebula drifts ~1.5% over 240s.
5. **The meteor** — one dim 1px streak crossing the upper sky for ~1.5s every ~84s. The site's single rare event; a visitor should catch it peripherally at most once. Hidden entirely under reduced-motion.
6. *(Future, after final artwork)* Observatory ambient loops — cursor blink, coffee steam. Decided per-element once art exists.

All motion sits inside `@media (prefers-reduced-motion: no-preference)`. Reduced-motion users get a fully static site. No scroll-driven animation, no parallax, no scroll-jacking — ever.

## 7. Component Principles

- **Row anatomy** (work rows, note rows): `mono num/date (support) · serif title (ink) · sans one-liner (muted) · mono tag + → (accent)`. Whole row is the link; hover = `--accent-wash` fill.
- **Index rows** (homepage directory): serif title ~1.6rem + one-line description + right-aligned live mono metadata computed from real content (`12 NOTES · LAST MAY 2026 →`).
- **Section labels**: mono uppercase kicker in `--support` (e.g. `SELECTED WORK`).
- **Links**: `--accent` with `--accent-underline` bottom border; hover → solid. External links get `↗`.
- **NOW readout**: mono, 2px `--accent` left border, accent dots, sourced from `src/data/now.json`.
- Social links are always visible and labeled (GITHUB / LINKEDIN / INSTAGRAM / EMAIL) — in the hero and in contact. Never icon-only, never hidden in menus.
- **Identity is woven editorially, never shouted**: the masthead wordmark ("Bipin Raj C", Fraunces, heaviest element in the header), the hero byline (`— Bipin Raj C · role` beneath the statement — authorship, not introduction), and the warm serif sign-off at contact. No "Hi, I'm" heroes.
- **Strip grammar**: `DOMAIN [TOOL · TOOL]` — problem domains bright, implied tools dimmer in brackets. Never a flat tech list.

## 8. The Builder's Observatory (hero artwork spec)

**Concept:** a lived-in workspace where a builder sits at a serious multi-monitor setup, beneath an observatory window opening to space. Reads in three glances: (1) person building at a serious setup → (2) workshop/observatory full of tools and notes → (3) small hidden details.

**Treatment:** original high-detail **fine-grain dither/stipple illustration** (engraving-like halftone — the Hacktron register), NOT chunky retro game pixels. **Duotone in the site's ink:** ivory dots on `--bg-panel` dark, with the window/lamp as the composition's only warm (`--warm`) light.

**Contents (candidates):** person at desk, 2–3 monitors (code, abstract system visualization), keyboard, headphones, notebook with sketches, electronics/circuit boards, cables, tools, books, coffee, plant, handwritten notes and crossed-out ideas, observatory window with stars/moon.

**Hard rules:**
- No real project references, names, or logos. No hoodie-hacker cliché. Not cyberpunk.
- Detailed enough that individual objects are recognizable — never a vague blob.
- Occupies the right ~44% of the desktop hero; below the statement on mobile (never above the name).
- The artwork is a **replaceable asset**: everything routes through `src/components/Observatory.astro`; swapping the art touches only that component. Layers are separated for animation only if proven worth it after the art exists.

**Process:** composition study (current — `FIG. 01`, an SVG underdrawing establishing the final composition: figure at three-monitor desk, round warm window upper-right, wall notes/map, books, machine under desk, plant) → AI-generated dither illustration matching that composition, art-directed iteratively → selective ambient animation. Artistic quality first, implementation elegance second.

**Integration rule:** the artwork has no border and no box — its dither dissolves into the page via an edge mask. Figure captions are numbered (`FIG. NN`) in `--font-pixel`, reading as research-notebook figures.

## 9. Background Atmosphere

Site-wide, in `Atmosphere.astro`, CSS-only (no canvas, no JS, animates only opacity/transform):

- **Two star depth layers**: a `fixed` far layer (tiled 1px radial-gradient stars, 0.3–0.5 ivory alpha, breathing per §6) and an `absolute` near layer (slightly larger, dimmer stars) that scrolls with the content — scrolling itself is the parallax.
- **Nebula tint**: `--accent` at ~0.07 alpha, large ellipse weighted upper-right, multi-minute drift.
- **The meteor**: see §6 item 5.
- Deliberately rejected: aurora gradients (third hue = palette noise), astronomical grid overlays (the hairline UI already is the instrument), constant particles, scroll-driven changes.
- The atmosphere must never compete with content: if you notice it while reading, it's too loud. The visitor should *discover* the movement, not be shown it.

## 10. Accessibility

- `:focus-visible`: 2px `--accent` outline, 2px offset, everywhere.
- One `h1` per page; landmarks nav/main/footer; heading order strictly descending.
- Decorative art `aria-hidden`; the Observatory container gets `role="img"` + descriptive label.
- Keyboard: every interactive element reachable and visibly focused.
- Reduced motion: complete static fallback (see §6).
- Contrast: see §3 floors. Lighthouse a11y ≥ 95.

## 11. Responsive

- Breakpoint: ~900px (hero stack), ~640px (row wrapping).
- Mobile hero order: kicker → statement → role → NOW → socials → Observatory (shorter crop).
- Nav: 6 mono links wrap to two lines — no hamburger, no drawer in v1.
- Index rows collapse to two lines (title+meta / description).
- Performance: static output, zero client JS (marquee is CSS), fonts subset via @fontsource; Lighthouse perf ≥ 95.

## 12. DO NOT

- No light mode. No theme toggle.
- No new grays or hexes outside §3. No `#FFF`, no `#000`.
- No warm color in UI outside the Observatory, `::selection`, and the contact sign-off (§3).
- No glassmorphism, backdrop blur, neon, cyberpunk, Matrix rain, green terminals.
- No 3D, WebGL, particles, scroll-jacking, parallax, cursor followers.
- No hamburger menus, command palettes, or hidden navigation.
- No icon-only social links. No contact form. No "Book a call".
- No thick borders, hard drop shadows, or rounded cards.
- No bold serif headlines (400/500 only). No letterspaced sans.
- No stacking of aesthetics: scrapbook/sketch fragments are allowed **only** on About and Trajectory, and only as marginalia.
- No content hardcoded in components that belongs in `src/content/` or `src/data/`.
- No motion outside the §6 inventory.
