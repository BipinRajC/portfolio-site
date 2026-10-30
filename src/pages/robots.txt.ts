import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('The canonical site URL is required for robots.txt');
  return new Response(`User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap-index.xml', site).href}

# CURIOUS CRAWLER // SIGNAL 02: /transmissions/handshake.txt
# The machines keep their secrets in the margins.
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
