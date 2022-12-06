---
layout: '../../layouts/CodeSnippet.astro'
title: jsdoc
---

# Types

```js
/**
 * @param {string=} n - Optional
 * @param {string} [n] - Optional
 * @param {(string|number)} n - Multiple types
 * @param {*} n - Any type
 * @param {...string} n - Repeatable arguments
 * @param {string} [n="hi"] - Optional with default
 * @param {string[]} n - Array of strings
 * @return {Promise<string[]>} n - Promise
 */
```

# Typedef

```js
/**
 * A song
 * @typedef {Object} Song
 * @property {string} title - The title
 * @property {number} year - The year
 */
```

### S2horthand

```js
/**
 * A song
 * @typedef {{title: string, year: number}} Song
 */
```

# Functions

```js
/**
 * This is a function.
 * @param {string} n - String param
 * @param {string} [o] - Optional
 * @param {string} [d=DefaultValue] - With default
 * @return {string} A good string
 *
 * @example
 *     foo('hello')
 */
function foo(n, o, d) {
  return n;
}
```

# Importing Types

```js
/**
 * @typedef {import('./Foo').default} Bar
 */
```

```js
/**
 * @param {Bar} x
 */
function test(x) {}
```
