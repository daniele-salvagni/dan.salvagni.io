---
title: images
---

## Convert .svg to .webp

```sh
for file in *.svg; do
  if [ -f "$file" ]; then
    echo "Converting $file..."
    rsvg-convert -w 2000 "$file" -o temp.png
    cwebp -q 90 temp.png -o "${file%.svg}.webp"
    rm temp.png
    echo "Created ${file%.svg}.webp"
  fi
done
```

## Image compression with sharp

Example: Resize all `.png` images in the current directory to 800px width and
save them as JPG with 80% quality in the `out` directory.

```sh
npx sharp-cli --input './*.png' --output '{dir}/out/{name}.jpg' resize 800 --format jpg --quality 80
```

CLI for Sharp: [sharp-cli](https://github.com/vseventer/sharp-cli)

## Image compression with squoosh

It looks like the squoosh CLI is deprecated by GoogleChromeLabs and only the
[web app](https://squoosh.app/) is being maintained.
