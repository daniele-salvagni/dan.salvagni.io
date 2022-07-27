---
title: Grid Generator
subtitle: Pen input calibration tool.
date: 2018-07-22
author: Daniele Salvagni
collection: soft
excerpt: A tool for generating calibration grids for pen input on Windows. Supports any resolution with any number of calibrations points which will be more densely distributed towards the edges.
---

<p align="center">*Grid generator for pen input calibration on Windows™ with live preview.*</p>

<div id="grid-app" class="content">

  <svg viewBox="-151 -101 302 202">
    <line v-for="h in horz" v-bind:x1="h" y1="-100" v-bind:x2="h" y2="100" style="stroke:#d5d5d5;stroke-width:0.5" />
    <line v-for="v in vert" x1="-150" v-bind:y1="v" x2="150" v-bind:y2="v" style="stroke:#d5d5d5;stroke-width:0.5" />
  </svg>

  <br><br>
  <p>The point distribution will be more dense at the edges and gradually decrease towards the middle. A margin of 10px will be kept around the screen to allow for better accuracy. This tool will generate:</p>

  - A grid of <input type="text" v-model="hpts" class="grid-input"> x
  <input type="text" v-model="vpts" class="grid-input"> points
  for a <input type="text" v-model="hres" class="grid-input"> x
  <input type="text" v-model="vres" class="grid-input"> px resolution.

  <p>The grid will have a total of {{ hpts\*vpts }} points. To begin the calibration, please copy and paste the following string in a Command Prompt:</p>

  <pre class="hljs" style="text-align:left;"><code style="white-space: initial;">
  {{ cmnd }}
  </code></pre>

  <br>
  <p>During the calibration process you should hold your pen in the same way you would hold it comfortably, it is also important that you try to be as *physically* accurate as possible while disregarding the on-screen indicator of the pen position.</p>

</div>

<!--<script src="/assets/app2.js"></script>-->
