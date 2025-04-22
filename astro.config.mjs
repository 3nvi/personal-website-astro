// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://aggelos.dev',
  trailingSlash: 'never',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // Use Netlify adapter if running in Netlify build environment, otherwise use Node.js adapter.
  adapter:
    process.env.NETLIFY === 'true'
      ? netlify({
          cacheOnDemandPages: true,
          imageCDN: false,
        })
      : node({ mode: 'standalone' }),

  integrations: [
    preact({ compat: true }),
    mdx(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  redirects: {
    '/blog/old-post': '/blog/new-post',
  },
});
