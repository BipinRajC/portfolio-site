import assert from 'node:assert/strict';
import { test } from 'node:test';

const origin = process.env.SITE_ORIGIN ?? 'http://localhost:4321';
const canonical = 'https://bipinrajc.vercel.app';

async function read(path) {
  const response = await fetch(new URL(path, origin));
  return { response, body: await response.text() };
}

test('portfolio exposes the correct canonical and a Person profile', async () => {
  const { response, body } = await read('/');
  assert.equal(response.status, 200);
  assert.ok(/rel="canonical" href="https:\/\/bipinrajc\.vercel\.app\//.test(body), 'homepage should use the canonical host');
  const schemaText = body.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(schemaText, 'homepage should contain structured data');
  const schema = JSON.parse(schemaText);
  assert.equal(schema['@type'], 'Person');
  assert.equal(schema.url, `${canonical}/`);
});

test('machine-readable profile contains current career context and valid site links', async () => {
  const { response, body } = await read('/llms.txt');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /text\/plain/);
  for (const term of ['Bipin Raj', 'security', 'SUMS', 'PRISM', 'Slingshot', 'confidential', 'work in progress', 'wa.me/917676795199']) {
    assert.ok(body.toLowerCase().includes(term.toLowerCase()), `missing ${term}`);
  }
  assert.ok(!body.includes('/projects/confidential-multitenancy'), 'unfinished placeholder projects should not appear as finished work');
  const urls = [...body.matchAll(/\]\((https:\/\/bipinrajc\.vercel\.app\/(?:[^)\s]*))\)/g)].map((m) => m[1]);
  assert.ok(urls.length >= 5, 'profile should link to portfolio pages');
  for (const url of urls) {
    const result = await read(new URL(url).pathname);
    assert.equal(result.response.status, 200, `${url} should resolve`);
  }
});

test('the optional trail is solvable using served clues', async () => {
  const home = await read('/');
  assert.ok(/easter egg/i.test(home.body), 'homepage should mention the hunt');
  assert.ok(/<!--[^>]*robots\.txt[^>]*-->/i.test(home.body), 'rendered source should point to robots.txt');
  const robots = await read('/robots.txt');
  assert.equal(robots.response.status, 200);
  assert.match(robots.body, /Sitemap:\s*https:\/\/bipinrajc\.vercel\.app\/sitemap-index\.xml/i);
  const firstPath = robots.body.match(/#.*(\/transmissions\/[\w-]+\.txt)/)?.[1];
  assert.ok(firstPath, 'robots comment should point to the first transmission');
  const first = await read(firstPath);
  assert.equal(first.response.status, 200);
  const frames = [...first.body.matchAll(/^FRAME\s+(\d+):\s*([A-Za-z0-9+/=]+)$/gm)];
  assert.ok(frames.length >= 2, 'transmission should include encoded frames');
  const decoded = Buffer.from(frames.sort((a, b) => Number(a[1]) - Number(b[1])).map((m) => m[2]).join(''), 'base64').toString('utf8').trim();
  assert.match(decoded, /^\/transmissions\/[\w-]+\.txt$/);
  const second = await read(decoded);
  assert.equal(second.response.status, 200);
  const cipher = second.body.match(/^ROT13:\s*(\/[a-z/.-]+)$/m)?.[1];
  assert.ok(cipher, 'second clue should contain the next encoded path');
  const ledgerPath = cipher.replace(/[a-z]/g, (c) => String.fromCharCode((c.charCodeAt(0) - 97 + 13) % 26 + 97));
  const ledger = await read(ledgerPath);
  assert.equal(ledger.response.status, 200);
  const records = [...ledger.body.matchAll(/^SEQ (\d+) VERIFIED=(yes|no) WORD=([A-Za-z]+)$/gm)];
  const key = records.filter((record) => record[2] === 'yes').sort((a, b) => Number(a[1]) - Number(b[1])).map((record) => record[3][0].toLowerCase()).join('');
  assert.equal(key.length, 7, 'ledger should contain seven verified records');
  const finalPath = `/transmissions/${key}.txt`;
  const final = await read(finalPath);
  assert.equal(final.response.status, 200);
  assert.match(final.response.headers.get('x-robots-tag') ?? '', /noindex/i);
  assert.match(final.body, /mission (complete|accomplished)/i);
  assert.match(final.body, /credit/i);
  assert.match(final.body, /knock knock/i);
  const unknown = await read('/transmissions/constructor.txt');
  assert.equal(unknown.response.status, 404, 'unknown transmissions should not expose inherited object properties');
});
