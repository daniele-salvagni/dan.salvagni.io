---
title: git
---

## Configuration

```bash
git config --global user.email "...@gmail.com"
git config --global user.name "Daniele Salvagni"
git config --global help.autocorrect 1
```

### Setup for personal / work config

```sh
# ~/.gitconfig
[includeIf "gitdir:~/personal/"]
  path = .gitconfig-personal
[includeIf "gitdir:~/work/"]
  path = .gitconfig-work
```

```sh
# ~/.gitconfig-personal
[user]
name = Name Surname
email = ...@gmail.com

```

```sh
# ~/.gitconfig-work
[user]
name = Name Surname
email = ...@work.com

```

## Basic commands

### Remote

```bash
git remote add <alias> <url>  # add git URL as an alias
git remote show <alias>       # show information about remote
git fetch <alias>             # fetch down all the **branches** from that remote
git merge <alias>/<branch>    # merge a remote branch into current branch
git merge --abort             # abort the merge
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

### Branches

```bash
git branch     # local branches
git branch -r  # remote branches
git branch -a  # all branches
git branch -av # all branches with details
```

```bash
git checkout -b <branch>  # create and switch to a new branch
git checkout -            # switch to the last branch
git branch -d <branch>    # delete a branch
git switch <branch>       # switch to a branch, look for remote
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
git clean -df  # to remove untracked files
```

Amend the last commit

```bash
git commit --amend -m "New commit message"

git add forgotten_file
git commit --amend --no-edit
```

Trigger a Pipeline by empty commit

```bash
git commit --allow-empty -m "chore: trigger pipeline"
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

### Blame someone else

```bash
git blame-someone-else "Name Surname <email@address>" <commit>
```

Install from: https://github.com/jayphelps/git-blame-someone-else

## Overview

![Git Overview](/img/notes/git/git-overview.png)
