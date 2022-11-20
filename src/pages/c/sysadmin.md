---
layout: '../../layouts/CodeSnippet.astro'
title: sysadmin
---

## Disable user

Disable the user named `guestuser` from logging in, including via `ssh`

    sudo usermod --expiredate 1 guestuser
