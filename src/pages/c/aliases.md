---
layout: '../../layouts/CodeSnippet.astro'
title: aliases
---

# Search aliases

```sh
alias ag='alias | grep '
```

# One letter

```sh
alias c='clear'
alias g='git'
alias h='history'
alias r='source ~/.zshrc'
alias -g G='| grep'
```

# Common defaults

```sh
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

alias grep='grep -n --color'
alias mkdir='mkdir -pv'
alias ping='ping -c 5'
```

# Common aliases

```sh
alias ff='find . -type f -name'
alias home='cd ${HOME}'
alias python='python3'
alias unexport='unset'
```

# Node

```sh
alias rnm='rm -rf node_modules'
alias nlg='npm list -g --depth 0' # global installed
alias nrb='npm run build'
alias nrs='npm run start'
alias nrd='npm run dev'
alias nrt='npm run test'
```

# Image optimizer

```sh
alias iow='npx @squoosh/cli --webp auto '
alias ioa='npx @squoosh/cli --avif auto '
alias iop='npx @squoosh/cli --oxipng auto '
```

# ls

```sh
alias l='ls -lFh'     #size,show type,human readable
alias la='ls -lAFh'   #long list,show almost all,show type,human readable
alias lr='ls -tRFh'   #sorted by date,recursive,show type,human readable
alias lt='ls -ltFh'   #long list,sorted by date,show type,human readable
alias ll='ls -l'      #long list
alias ldot='ls -ld .*'
alias lS='ls -1FSsh'
alias lart='ls -1Fcart'
alias lrt='ls -1Fcrt'
alias lsr='ls -lARFh' #Recursive list of files and directories
alias lsn='ls -1'     #A column contains name of files and directories
```
