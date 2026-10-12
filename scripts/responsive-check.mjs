/**
 * Responsive QA — checks every route for horizontal overflow at the
 * project's target viewport widths and captures screenshots.
 * Usage: node scripts/responsive-check.mjs [baseUrl]
 * Requires playwright-core + a cached chromium (not a project dependency).
 */
import { chromium } from 'playwright-core';
import { mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';

// reuse a cached chromium if the registry version doesn't match
const CACHED = [
  `${homedir()}/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell`,
  `${homedir()}/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome`,
].find((p) => existsSync(p));

const BASE = process.argv[2] ?? 'http://localhost:4321';
const ROUTES = ['/', '/about', '/experience', '/projects', '/projects/vyuha', '/projects/footyquant', '/projects/brain-overflow', '/projects/thermorl', '/notes', '/notes/hello-world', '/trajectory', '/contact', '/404'];
const WIDTHS = [320, 360, 390, 430, 768, 1024, 1280, 1440];

const browser = await chromium.launch(CACHED ? { executablePath: CACHED } : { channel: 'chromium-headless-shell' });
const failures = [];
mkdirSync('shots', { recursive: true });

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const pageOverflow = doc.scrollWidth - doc.clientWidth;
      // find the widest offenders when the page overflows
      const offenders = [];
      if (pageOverflow > 1) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 1 && r.width < doc.scrollWidth) {
            offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(r.right)}`);
          }
        }
      }
      return { pageOverflow, offenders: offenders.slice(0, 5) };
    });
    if (overflow.pageOverflow > 1) {
      failures.push({ width, route, ...overflow });
    }
    if (width === 320 || width === 390 || width === 768 || width === 1280) {
      const name = route === '/' ? 'home' : route.replaceAll('/', '_').replace(/^_|_$/g, '');
      await page.screenshot({ path: `shots/w${width}${name}.png`, fullPage: width <= 768 });
    }
  }
  await page.close();
}
await browser.close();

if (failures.length === 0) {
  console.log(`PASS — no horizontal overflow on ${ROUTES.length} routes x ${WIDTHS.length} widths`);
} else {
  console.log(`FAIL — ${failures.length} overflow cases:`);
  for (const f of failures) {
    console.log(`  w=${f.width} ${f.route}  overflow=${f.pageOverflow}px`);
    for (const o of f.offenders) console.log(`    → ${o}`);
  }
  process.exit(1);
}
