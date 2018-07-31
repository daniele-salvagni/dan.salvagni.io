---
title: Color Goggles
subtitle: Saturation manager for Intel™ and Dual-Graphics laptops.
date: 2017-12-24
author: Daniele Salvagni
collection: software
excerpt: ColorGoggles is an extremely lightweight application that automatically manages your digital saturation when playing games to enhance visibility. This is an alternative to VibranceGUI for Intel HD Graphics or dual-graphics laptops.
layout: page.hbs
draft: false
---

<p align="center">*Saturation manager for Intel™ and Dual-Graphics laptops.*</p>

![ColorGoggles](/assets/img/content/colorgoggles.png)

ColorGoggles is an extremely lightweight application that automatically manages your digital saturation (**unlocked up to 320%**) when playing games to enhance visibility.

This is an alternative to VibranceGUI for **Intel HD Graphics** or **dual-graphics laptops**. The application is absolutely VAC safe, it does use the same functions as the Intel Control Panel but with the limits removed, many professional players are also known to tweak their digital saturation.

Intel did not release any public APIs so I had to make this tool by reverse engineering the Intel Control Panel and some related driver libraries, contact me if you have any problems.

## Installation instructions

- **Download** and extract the .zip archive;
- Open `C:\Windows\System32` and use the **Search** function to find a file named `igfxDHLib.dll` (*it sould be in the `DriverStore` subfolder but that's not always the case*);
- **Copy** of `igfxDHLib.dll` in the same folder as `Color-Goggles.exe`;
- **Run** `Color-Goggles.exe`.

There are multiple versions of `igfxDHLib.dll` depending on your drivers version and device, so you must use your own. If you can't find this file your drivers are either too old or your device is not supported, there are a couple discussions about this on GitHub with more information.

<br><div align="center"><a class="button" align="center" target="_blank" href="https://github.com/daniele-salvagni/color-goggles/releases/download/v1.0.1/Color-Goggles-v1.0.1.zip">Download ColorGoggles (v1.0.1)</a></div>

<br>

You can always find the latest releases (along with the sourcecode) on **GitHub**: https://github.com/daniele-salvagni/color-goggles/releases
