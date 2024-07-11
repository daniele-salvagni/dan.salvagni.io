---
title: aliases
---

### Search

```sh
alias ag='alias | grep '
alias ff='find . -type f -name'
```

### One letter

```sh
alias c='clear'
alias g='git'
alias h='history'
alias r='source ~/.zshrc'
```

### Grep pipe

```sh
grep_pipe() {
  grep "$@"
}
alias G=grep_pipe
```

### Common defaults

```sh
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

alias grep='grep -n --color'
alias mkdir='mkdir -pv'
alias ping='ping -c 5'
```

### Common aliases

```sh
alias home='cd ${HOME}'
alias unexport='unset'
```

### Navigation

```sh
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ......='cd ../../../../..'
```

### Other

```sh
alias offrecord='history -d $(history 1)'
```

### Python

```sh
alias py='python3'
alias serve='python3 -m http.server'
```

### Node

```sh
alias rnm='rm -rf node_modules'
alias nlg='npm list -g --depth 0' # global installed
alias nrb='npm run build'
alias nrs='npm run start'
alias nrd='npm run dev'
alias nrt='npm run test'
```

### List directory contents

```sh
alias l='ls -lFh'     # size,show type,human readable
alias la='ls -lAFh'   # long list,show almost all,show type,human readable
alias ll='ls -la'     # long list, show almost all
alias l.='ls -ldh .*' # show hidden files
alias lsn='ls -1'     # one column with name of files and directories
```

### Image optimizer

```sh
alias iow='npx @squoosh/cli --webp auto '
alias ioa='npx @squoosh/cli --avif auto '
alias iop='npx @squoosh/cli --oxipng auto '
```
