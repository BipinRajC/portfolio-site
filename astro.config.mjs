// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import yaml from '@rollup/plugin-yaml';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bipinrajc.vercel.app',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [mdx(), sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/transmissions/') })],
  vite: {
    plugins: [yaml()],
  },
});
