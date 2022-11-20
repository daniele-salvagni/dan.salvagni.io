---
layout: '../../layouts/CodeSnippet.astro'
title: javascript
---

# Promises

```js
// ~ CREATING PROMISES
new Promise((resolve, reject) => {
  doStuff(() => {
    if (success) {
      resolve('good');
    } else {
      reject(new Error('oops'));
    }
  });
});

promise
  .then((result) => {
    // success
  })
  .catch((error) => {
    // failure
  })
```

### Multiple promises

```js
const promises = [promise1(), promise2()];

Promise.all(promises).then((results) => {
  // succeeds when all succeed
});

Promise.race(promises).then((result) => {
  // succeeds when one finishes first
});

```
