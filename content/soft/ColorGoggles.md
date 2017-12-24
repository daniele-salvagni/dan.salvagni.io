---
title: Color-Goggles
date: 2017-12-24
author: Daniele Salvagni
collection: software
excerpt: ColorGoggles is an extremely lightweight application (43kb) that automatically manages your digital saturation when playing games to enhance visibility. This is an alternative to VibranceGUI for people with Intel HD Graphics or dual-graphics laptops.
layout: page.hbs
draft: false
---

<p align="center">*Saturation manager for Intel™ and Dual-Graphics laptops.*</p>

![ColorGoggles](/assets/img/content/colorgoggles.png)

ColorGoggles is an extremely lightweight application (43kb) that automatically manages your digital saturation when playing games to enhance visibility.

This is an alternative to VibranceGUI for people with Intel HD Graphics or dual-graphics laptops. The application is absolutely VAC safe, many professional players are known to tweak their digital saturation.

Intel did not release any public APIs, I had to make this tool by reverse engineering the Intel Control Panel and some related driver libraries, so contact me if you get any unexpected behavior. At the moment the code is coming straight out of the experimenting phase but as long as your system is supported the application will be stable and functional.

## Installation

- Download and extract the .zip archive
- Open `C:\Windows\System32\DriverStore\FileRepository` and do a search for a file named `igfxDHLib.dll`
- Copy `igfxDHLib.dll` in the same folder as `ColorGoggles.exe`

You need to do this because there are multiple versions of `igfxDHLib.dll` depending on your device (they all have the same version number but are actually different), so I cannot embed the code in the assembly nor distribute it with my DLL as it wouldn't work in many cases.

<br><div align="center"><a class="button" align="center" target="_blank" href="https://github.com/daniele-salvagni/color-goggles/releases/download/v0.2.1-beta/ColorGoggles-v0.2.1.zip">Download ColorGoggles (43kb)</a></div>


<br>

You can always find the latest releases (along with the sourcecode) on GitHub: https://github.com/daniele-salvagni/color-goggles/releases
