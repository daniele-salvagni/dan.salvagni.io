// @ts-check
import { defineConfig } from 'astro/config';
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerMetaHighlight,
} from '@shikijs/transformers';
import tailwindcss from '@tailwindcss/vite';

import { targetBlank } from './src/plugins/targetBlank';
import theme from 'shiki/themes/github-light-default.mjs';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    'editor.background': '#fafafa',
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://dsalvagni.com',
  vite: {
    plugins: [tailwindcss()],
    server: {
      cors: {
        origin: true,
        credentials: true,
      },
    },
  },
  markdown: {
    rehypePlugins: [[targetBlank, { domain: 'dsalvagni.com' }]],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      // theme: customizedTheme,
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // theme: "github-light",
      theme: customTheme,
      transformers: [
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerMetaHighlight(),
      ],
      // Disable word wrap to enable horizontal scrolling
      wrap: false,
    },
  },
});
