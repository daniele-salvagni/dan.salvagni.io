---
layout: '../../layouts/BlogPost.astro'
collection: blog
issue: 9

author: Daniele Salvagni
title: 'Fixing ZSH slowdown caused by NVM'
publishDate: 2022-11-18

excerpt: >
  After profiling zsh I found out that nvm was the reason of the slow startup
  times. This script solved the issue by loading nvm only when needed.
---

When I first started using [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) on my
MacBook, I immediately noticed was how slow it was to startup.

To find the root cause, I turned on profiling by adding `zmodload zsh/zprof` at
the start of `.zshrc` file and `zprof` at the end, this clearly showed that
`nvm` was the main culprit.

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

# Alternative: Replacing `nvm` with `fnm`

If you want a less "patchy" solution with less downsides, you can just entirely
replace `nvm` with [`fnm`](https://github.com/Schniz/fnm), a much faster Node.js
version manager built in Rust. It's compatible with `nvm` and works with
`.nvmrc` and `.node-version`.

## Installation

```sh
brew install fnm
```

And then add the following to your `.zshrc` profile

```sh
eval "$(fnm env --use-on-cd)"
```

I also created an alias so I can stop typing `nvm` by habit

```sh
alias nvm='echo "(╯°□°)╯︵ɯʌu, did you mean fnm?"'
```

> Update: I have been using `fnm` instead of `nvm` for a few months now with no
> issues, I highly recommend it.
