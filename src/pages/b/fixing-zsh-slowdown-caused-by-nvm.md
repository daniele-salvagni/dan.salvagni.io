---
layout: '../../layouts/BlogPost.astro'
collection: blog
issue: 9

author: Daniele Salvagni
title: 'Fixing ZSH slowdown caused by NVM'
publishDate: 2022-11-18

description: >
  After profiling zsh I found out that nvm was the reason of the slow startup
  times. This script solved the issue by loading nvm only when needed.
---

When I started using [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh), the first
things I noticed was how slow it was to startup.

To find the root cause, I turned on profiling by adding `zmodload zsh/zprof` at
the start of `.zshrc` file and `zprof` at the end, this clearly showed that
`nvm` was the main reason of the slowdown.

![zprof](/assets/img/content/009/zprof.png)

The best solution I found was removing the `nvm` plugin inside `.zshrc` and
replacing the default `nvm` stuff with the following:

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" --no-use # This loads nvm

alias node='unalias node ; unalias npm ; nvm use default ; node $@'
alias npm='unalias node ; unalias npm ; nvm use default ; npm $@'
```

This fixes the issue and moves the slowness to the first time you actually run
`node` or `nvm`. More info on this
[Github issue comment](https://github.com/nvm-sh/nvm/issues/539#issuecomment-245791291)
by @parasyte.
