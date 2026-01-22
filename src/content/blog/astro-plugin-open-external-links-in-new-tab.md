---
issue: 12

author: Daniele Salvagni
title: "An Astro plugin to open external links in a new tab"
pubDate: "Jul 11, 2024"
emoji: 🛠️

description: >
  Creating a simple Rehype plugin to automatically add target="_blank" to all
  external links in Astro.
---

By default, when writing markdown content in [Astro](https://astro.build/), all
links are rendered as `<a>` tags that open in the same tab. This is not ideal
for external links, since you usually want to keep users on your site.

The solution is pretty simple, and it does involve writing a simple Rehype
plugin.

## Writing the Rehype plugin

To put it simply, a [rehype](https://github.com/rehypejs/rehype) plugin is just
a function that takes the Abstract Syntax Tree (AST) of the HTML as input and
modifies it in some way.

The following [visits](https://github.com/syntax-tree/unist-util-visit) all the
elements in the tree while adding `target="_blank"` to external links:

```ts
// src/plugins/targetBlank.ts

import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";

export const targetBlank: RehypePlugin = ({ domain = "" } = {}) => {
  return (tree) => {
    visit(tree, "element", (e: Element) => {
      if (
        e.tagName === "a" &&
        e.properties?.href &&
        e.properties.href.toString().startsWith("http") &&
        !e.properties.href.toString().includes(domain)
      ) {
        e.properties!["target"] = "_blank";
      }
    });
  };
};
```

### Enabling the plugin

To enable the plugin, update your `astro.config.ts` with the following:

```ts {7-9}
// astro.config.ts

import { targetBlank } from "./src/plugins/targetBlank";

export default defineConfig({
  // ...
  markdown: {
    rehypePlugins: [[targetBlank, { domain: "yourdomain.com" }]], // { domain: 'yourdomain.com' }]
  },
});
```

And that's it! All external links will now open in a new tab.

> And here is a test with an [internal link](/) which should still open in the
> same tab.
