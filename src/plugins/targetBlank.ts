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
