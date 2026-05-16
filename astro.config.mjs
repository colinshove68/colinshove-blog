// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { SITE_URL } from './src/consts';

export default defineConfig({
  site: SITE_URL,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  build: {
    // Trailing slash consistency: keeps canonical URLs predictable
    format: 'directory',
  },
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: false,
  },
});
