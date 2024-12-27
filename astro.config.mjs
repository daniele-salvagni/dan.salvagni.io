import { defineConfig } from 'astro/config';
import { targetBlank } from './src/plugins/targetBlank';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import theme from 'shiki/themes/github-light.json';
import alpinejs from '@astrojs/alpinejs';
const customizedTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    'editor.background': '#fafafa',
  },
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: customizedTheme,
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: false,
    },
    rehypePlugins: [[targetBlank, { domain: 'dan.salvagni.io' }]],
    mode: 'mdx'
  },
  site: 'https://dan.salvagni.io',
  integrations: [mdx(), sitemap(), alpinejs()],
});
