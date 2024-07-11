---
title: tar
---

# Common Commands

Creating an uncompressed archive

    tar cvf file.tar *

Updating an existing archive

    tar rvf file.tar *

Extracting files from an archive

    tar xvf file.tar

Listing the content of an archive

    tar tf file.tar

Creating a gzip compressed archive

    tar cvzf file.tar.gz *

Extracting a gzip compressed archive

    tar xvzf file.tar.gz

# Common Options

- `-c` creates archive
- `-x` extracts archive
- `-f` given archive filename
- `-t` list the archive content
- `-v` displays verbose information (and progress)
- `-u` archives and adds to an existing archive
- `-r` update or append to the existing archive
- `-j` filter archive through bzip2
- `-z` filter archive through gzip
- `-W` verify an archive
- `-A` concatenates the archives
- `--exclude` excludes file or directory
- `--delete` removes file or directory
