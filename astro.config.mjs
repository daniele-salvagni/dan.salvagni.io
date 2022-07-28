import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	markdown: {
		shikiConfig: {
		  theme: 'material-lighter',
		  wrap: false
	    },
	},
	integrations: [mdx()],
	site: `http://localhost:3000`,
});