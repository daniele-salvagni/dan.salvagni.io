---
layout: '../../layouts/CodeSnippet.astro'
title: python
---

# NumPy

    pip install numpy

### Saving a matrix of random numbers to file

```py
import numpy as np

rng = np.random.default_rng()
with open('test1000x100.npy', 'wb') as f:
  np.save(f, rng.random((1000, 100))) # float64
```
