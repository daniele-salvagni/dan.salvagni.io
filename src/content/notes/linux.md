---
title: linux
---

## Disable user

Disable the user named `guestuser` from logging in, including via `ssh`

    sudo usermod --expiredate 1 guestuser

## Text search

Look for text in all files in the current directory recursively

    grep -Hrn <text> .

## Disk usage

List all available partitions to mount

    lsblk

Mount drive the easy way

    udisksctl mount -b /dev/sd[letter][number]

## Files

File copier with progress bar

    rsync -vau
