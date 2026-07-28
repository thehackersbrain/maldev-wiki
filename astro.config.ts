// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import { maldevTheme } from './src/lib/shiki-theme';

export default defineConfig({
  // canonical origin — keep in sync with src/lib/seo.ts
  site: 'https://maldev.thehackersbrain.dev',
  integrations: [
    mdx(),
    sitemap({
      // the search page is a UI surface, not a document worth indexing
      filter: (page) => !page.includes('/search'),
      serialize: (item) => ({
        ...item,
        // technique pages are the reason the site exists
        priority: /\/techniques\/[^/]+\/[^/]+/.test(item.url) ? 0.9 : 0.6,
        changefreq: ChangeFreqEnum.WEEKLY,
      }),
    }),
  ],
  // self-hosted: no render-blocking request to fonts.googleapis.com
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: { theme: maldevTheme, wrap: false },
  },
});
