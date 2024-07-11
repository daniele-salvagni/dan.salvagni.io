---
title: git
---

## Configuration

```bash
git config --global user.email "daniele.salvagni@gmail.com"
git config --global user.name "Daniele Salvagni"
git config --global core.editor nano
git config --global help.autocorrect 1
```

## Basic commands

### Remote

```bash
git remote add <alias> <url>  # add git URL as an alias
git fetch <alias>             # fetch down all the **branches** from that remote
git merge <alias>/<branch>    # merge a remote branch into current branch
git push <alias> <branch>     # transmit local branch to remote repository
git pull                      # fetch and merge any commits from remote
```

### Stash

```bash
git stash             # save modified and staged changes
git stash -u          # include untracked files
git stash list        # list stack-order of stashed file changes
git stash pop         # write working from top of stash stack
git stash drop [id]   # discard the changes from top of stack or by [id]

# alternative to include a message
git stash save "your stash message"
```

### Remove an ignored file from git

This will remove a file from git that has been added to .gitignore while keeping
it in the working directory

```bash
git rm --cached <file>
```

### Listing branches

```bash
git branch     # local branches
git branch -r  # remote branches
git branch -a  # all branches
git branch -av # all branches with details
```

### Tagging

```bash
git tag -a v1.0.0 -m "The first official version"
git show v1.0.0
git describe --tags

git push --tags
git push origin v1.0.0  # same effect
```

### Rewrite history

Apply any commits of current branch ahead of specified one

```bash
git rebase <branch>
```

Clear staging area, rewrite working tree from specified commit

```bash
git reset --hard <commit>
```

## Advanced commands

### Backup untracked files

```bash
git ls-files --others --exclude-standard -z |\
xargs -0 tar rvf ~/backup-untracked.zip
```

### Sync with remote, overwrite local changes

```bash
git fetch origin && git reset --hard origin/master && git clean -f -d
```

### Undo last commit but keep changed files in stage

```bash
uncommit = reset --soft HEAD~1
```

### Reset a single file

To reset both the working copy and its state in the Git index to that of HEAD:

```bash
git checkout HEAD -- file.txt
```

### Rebase local branch to remote master

```bash
git pull --rebase origin master
```

or

```bash
git fetch origin
git rebase origin/master
```

### Counting commits

```bash
git shortlog -s -n
```

## Overview

![Git Overview](/img/notes/git/git-overview.png)
