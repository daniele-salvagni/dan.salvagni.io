---
title: ollama
---

Delete all pulled models

```bash
ollama list | awk 'NR>1 {print $1}' | xargs -I {} ollama rm {}
```
