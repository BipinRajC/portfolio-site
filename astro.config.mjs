// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import yaml from '@rollup/plugin-yaml';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // PLACEHOLDER: update to the real production URL after Vercel import
  site: 'https://portfolio-site.vercel.app',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [yaml()],
  },
});