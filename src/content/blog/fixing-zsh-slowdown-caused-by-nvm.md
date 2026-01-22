---
issue: 9

author: Daniele Salvagni
title: "Fixing ZSH slowdown caused by NVM"
pubDate: "Nov 18, 2022"
emoji: 🛠️

description: >
  After profiling zsh I found out that nvm was the reason of the slow startup
  times. This script solved the issue by loading nvm only when needed.
---

> Update: I have been using `fnm` instead of `nvm` for more than one year
> without any problems, see more in the second half of this post.

When I first started using [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) on my
MacBook, I immediately noticed was how slow it was to startup.

To find the root cause, I turned on profiling by adding in my `.zshrc` file
`zmodload zsh/zprof` as the first line and `zprof` at the end. The results
showed that `nvm` was the main culprit:

![zprof](/img/blog/fnm/zprof.png)

The best workaround I found was removing the `nvm` plugin inside `.zshrc` and
replacing the default `nvm` stuff with the following:

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" --no-use # This loads nvm

alias node='unalias node ; unalias npm ; nvm use default ; node $@'
alias npm='unalias node ; unalias npm ; nvm use default ; npm $@'
```

This fixes the issue and moves the slowness to the first time you actually run
`node/npm/nvm`. More info on this
[Github issue comment](https://github.com/nvm-sh/nvm/issues/539#issuecomment-245791291)
by @parasyte.

## Alternative solution: reeplacing nvm with fnm

If you want a less "patchy" solution with less downsides, you can just entirely
replace `nvm` with [`fnm`](https://github.com/Schniz/fnm), a much faster Node.js
version manager written in Rust. It's a drop-in replacement for `nvm` also
compatible with `.nvmrc` and `.node-version`.

To stop typyng `nvm` by habit though, I had to create the following alias:

```sh
alias nvm='echo "(╯°□°)╯︵ɯʌu, did you mean fnm?"'
```
