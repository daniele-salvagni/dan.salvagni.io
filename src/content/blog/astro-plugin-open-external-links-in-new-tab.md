---
issue: 12

author: Daniele Salvagni
title: 'An Astro plugin to open external links in a new tab'
pubDate: 'Jul 11, 2024'
emoji: 🛠️

description: >
  Creating a simple Rehype plugin to automatically add target="_blank" to all
  external links in Astro.
---

By default, when writing markdown content in [Astro](https://astro.build/), all
links are rendered to `<a>` tags that open in the same tab. This is not ideal
for external links, as you might want to keep the user on your site.

The solution is pretty simple, and it does involve writing a simple rehype
plugin.

## Writing the Rehype plugin

To put it simply, a [rehype](https://github.com/rehypejs/rehype) plugin is just
a function that takes the AST (Abstract Syntax Tree) of the HTML as input and
modifies it in some way.

The following [visits](https://github.com/syntax-tree/unist-util-visit) all the
elements in the tree while adding `target="_blank"` to external links:

```ts
// src/plugins/targetBlank.ts

import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

export const targetBlank: RehypePlugin = ({ domain = '' } = {}) => {
  return (tree) => {
    visit(tree, 'element', (e: Element) => {
      if (
        e.tagName === 'a' &&
        e.properties?.href &&
        isExternal(e.properties.href.toString(), domain)
      ) {
        e.properties!['target'] = '_blank';
      }
    });
  };
};

const isExternal = (url: string, domain: string) =>
  url.startsWith('http') && !url.includes(domain);
```

### Enabling the plugin

To enable the plugin, update `astro.config.ts` with the following:

```ts
// astro.config.ts

import { targetBlank } from './src/plugins/targetBlank';

export default defineConfig({
  // ...
  markdown: {
    rehypePlugins: [[targetBlank, { domain: 'yourdomain.com' }]],
  },
});
```

And that's it! Now all external links will open in a new tab.
