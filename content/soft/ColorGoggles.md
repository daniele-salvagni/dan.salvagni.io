---
title: Color Goggles
subtitle: Saturation manager for Intel™ and Dual-Graphics laptops.
date: 2017-12-24
author: Daniele Salvagni
collection: software
excerpt: ColorGoggles is an extremely lightweight application that automatically manages your digital saturation when playing games to enhance visibility. This is an alternative to VibranceGUI for people with Intel HD Graphics or dual-graphics laptops.
layout: page.hbs
draft: false
---

<p align="center">*Saturation manager for Intel™ and Dual-Graphics laptops.*</p>

![ColorGoggles](/assets/img/content/colorgoggles.png)

ColorGoggles is an extremely lightweight application that automatically manages your digital saturation (**now up to 320%**) when playing games to enhance visibility.

This is an alternative to VibranceGUI for people with Intel HD Graphics or dual-graphics laptops. The application is absolutely VAC safe, many professional players are known to tweak their digital saturation.

Intel did not release any public APIs, I had to make this tool by reverse engineering the Intel Control Panel and some related driver libraries, so contact me if you get any unexpected behavior.

## Installation

- Download and extract the .zip archive
- Open `C:\Windows\System32` and use the Search function to find a file named  `igfxDHLib.dll`
- Copy `igfxDHLib.dll` in the same folder as `Color-Goggles.exe`

You need to do this because there are multiple versions of `igfxDHLib.dll` depending on your device (they all have the same version number but are actually different), so I cannot embed the code in the assembly nor distribute it with my DLL as it wouldn't work in many cases.

<br><div align="center"><a class="button" align="center" target="_blank" href="https://github.com/daniele-salvagni/color-goggles/releases/download/v1.0.1/Color-Goggles-v1.0.1.zip">Download ColorGoggles (v1.0.1)</a></div>


<br>

You can always find the latest releases (along with the sourcecode) on GitHub: https://github.com/daniele-salvagni/color-goggles/releases
