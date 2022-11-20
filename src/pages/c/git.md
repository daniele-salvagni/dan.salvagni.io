---
layout: '../../layouts/CodeSnippet.astro'
title: git
---

# Config

```bash
git config --global user.email "daniele.salvagni@gmail.com"
git config --global user.name "Daniele Salvagni"
git config --global help.autocorrect 1
```

# Basic commands

### Remote

```bash
git remote add [alias] [url]  # add git URL as an alias
git fetch [alias]             # fetch down all the branches from that remote
git merge [alias]/[branch]    # merge a remote branch into current branch
git push [alias] [branch]     # transmit local branch to remote repository
git pull                      # fetch and merge any commits from remote
```

### Stash

```bash
git stash        # save modified and staged changes
git stash list   # list stack-order of stashed file changes
git stash pop    # write working from top of stash stack
git stash drop   # discard the changes from top of stack
```

### Rewrite history

Apply any commits of current branch ahead of specified one

    git rebase [branch]

Clear staging area, rewrite working tree from specified commit

    git reset --hard [commit]

# Advanced commands

### Backup untracked files

    git ls-files --others --exclude-standard -z |\
    xargs -0 tar rvf ~/backup-untracked.zip

### Sync with remote, overwrite local changes

    git fetch origin && git reset --hard origin/master && git clean -f -d

