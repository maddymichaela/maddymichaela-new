import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with your production domain before deploying (needed for canonical URLs, sitemap, RSS).
  site: 'https://example.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), markdoc(), mdx(), sitemap(), pagefind(), icon(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
    // astro-seo and astro-pagefind ship raw .ts/.astro source with no
    // compiled build; force Vite to transform them instead of letting
    // Node's SSR externalization try (and fail) to load the raw files.
    ssr: {
      noExternal: ['astro-seo', 'astro-pagefind'],
    },
  },
});
