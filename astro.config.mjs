// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import netlify from '@astrojs/netlify';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://aggelos.dev',
  adapter: netlify(),

  integrations: [
    preact({ compat: true }),
    mdx(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],

  experimental: {
    svg: true,
    session: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
