---
layout: '../../layouts/SoftPost.astro'
collection: soft
order: 2

author: Daniele Salvagni
title: Grid Generator
description: Pen input calibration tool with live preview.
publishDate: 2018-07-22

excerpt: >
  A tool for generating calibration grids for pen input on Windows. Supports any
  resolution with any number of calibrations points which will be more densely
  distributed towards the edges.
---

<p align="center">Grid generator for pen input calibration on Windows™ with live preview.</p>

<div id="grid-app" class="content">

  <svg viewBox="-151 -101 302 202">
    <line v-for="h in horz" v-bind:x1="h" y1="-100" v-bind:x2="h" y2="100" style="stroke:#d5d5d5;stroke-width:0.5" />
    <line v-for="v in vert" x1="-150" v-bind:y1="v" x2="150" v-bind:y2="v" style="stroke:#d5d5d5;stroke-width:0.5" />
  </svg>

<br><br>

  <p>The point distribution will be more dense at the edges and gradually decrease towards the middle. A margin of 10px will be kept around the screen to allow for better accuracy. This tool will generate:</p>

\- A grid of <input type="text" v-model="hpts" class="grid-input"> x
<input type="text" v-model="vpts" class="grid-input"> points for a
<input type="text" v-model="hres" class="grid-input"> x
<input type="text" v-model="vres" class="grid-input"> px resolution.

  <p>The grid will have a total of {{ hpts * vpts }} points. Copy and paste the following string in a Command Prompt to start the calibration:</p>

  <pre class="astro-code" style="background-color: #FAFAFA; overflow-x: auto;"><code style="white-space: initial;">
  {{ cmnd }}
  </code></pre>

  <br>
  <p>During the calibration process you should hold your pen in the same way you would hold it comfortably, it is also important that you try to be as *physically* accurate as possible while disregarding the on-screen indicator of the pen position.</p>

</div>

<script src="https://unpkg.com/vue@2.5.16"></script>
<script>
new Vue({
  el: '#grid-app',

  data: {
    hres: 2160,
    vres: 1440,
    hpts: 17,
    vpts: 14
  },

  computed: {
    horz: function () {
      return getIntervals(this.hpts, -150, 150);
    },
    vert: function () {
      return getIntervals(this.vpts, -100, 100);
    },
    cmnd: function () {
      let command = 'tabcal devicekind=pen lincal novalidate';
      let xarr = this.horz.map((x) =>
        Math.round(((x + 150) / 300) * (this.hres - 20) + 10)
      );
      let yarr = this.vert.map((y) =>
        Math.round(((y + 100) / 200) * (this.vres - 20) + 10)
      );
      return (
        command +
        ' XGridPts=' +
        xarr.toString() +
        ' YGridPts=' +
        yarr.toString()
      );
    }
  }
});

function getIntervals(points, min, max) {
  let arr = [];
  let pts = points - 3;
  let unit = max / ((pts / 2 + 1) * (pts / 2 + 2)); // /6?

  for (let i = 0; i < pts / 2; i++) arr.push(unit * (i + 1) * (i + 2) - max);
  let mirror = arr.concat(
    arr.map(function (x) {
      return x * -1;
    })
  );
  if (points > 1) mirror = mirror.concat([min, max]);
  if (pts % 2 == 0) mirror = mirror.concat(0);
  mirror = mirror.sort(function (a, b) {
    return +a - +b;
  });
  return mirror;
}
</script>

<style>
pre {
  overflow: auto;
}


[type='color'], [type='date'], [type='datetime'], [type='datetime-local'], [type='email'], [type='month'], [type='number'], [type='password'], [type='search'], [type='tel'], [type='text'], [type='time'], [type='url'], [type='week'], input:not([type]), textarea {
    appearance: none;
    background-color: #fff;
    border: 1px solid #98978e;
    border-radius: 3px;
    box-sizing: border-box;
    margin-bottom: 1em;
    padding: 0.66667em;
    width: 100%;
}

.grid-input {
    display: inline-block;
    width: 4rem;
    text-align: center;
    padding: 0.1rem;
    border-color: #7a7972;
}
</style>
