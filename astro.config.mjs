import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'material-lighter',
      wrap: true
    }
  },
  integrations: [mdx(), vue()],
  site: `http://localhost:3000`
});
