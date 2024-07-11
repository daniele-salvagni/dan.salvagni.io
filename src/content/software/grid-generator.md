---
title: 'Grid Generator'
emoji: 📐
order: 3

description: |
  Pen input calibration tool for Windows with live preview.
---

<p align="center">Grid generator for pen input calibration on Windows™ with live preview.</p>

<div id="grid-app" class="content">

  <svg viewBox="-151 -101 302 202">
    <line v-for="h in horz" v-bind:x1="h" y1="-100" v-bind:x2="h" y2="100" style="stroke:#d5d5d5;stroke-width:0.5" />
    <line v-for="v in vert" x1="-150" v-bind:y1="v" x2="150" v-bind:y2="v" style="stroke:#d5d5d5;stroke-width:0.5" />
  </svg>

  <p>This tool is for calibrating the pen input on Windows devices. It will generate a grid of points that you will have to tap with your pen.</p>

  <p>The point distribution will be more dense at the edges and gradually decrease towards the middle. A margin of 10px will be kept around the screen to allow for better accuracy.</p>

  <p>This will generate a grid of <input type="text" v-model="hpts" class="grid-input"> x
<input type="text" v-model="vpts" class="grid-input"> points for a
<input type="text" v-model="hres" class="grid-input"> x
<input type="text" v-model="vres" class="grid-input"> px resolution.
</p>

  <p>The grid will have a total of <b>{{ hpts * vpts }}</b> points. Copy and paste the following string in a Command Prompt to start the calibration:</p>

  <pre class="astro-code" ><code>
  {{ cmnd }}
  </code></pre>

  <p>During the calibration process you should hold your pen in the same way you would hold it comfortably, it is also important that you try to be as <i>physically</i> accurate as possible while disregarding the on-screen indicator of the pen position.</p>

</div>

<script src="https://unpkg.com/vue@2.5.16"></script>
<script>
new Vue({
  el: '#grid-app',

  data: {
    hres: 2160,
    vres: 1440,
    hpts: 16,
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
  white-space: normal;
  overflow-wrap: anywhere;
}

[type='color'], [type='date'], [type='datetime'], [type='datetime-local'], [type='email'], [type='month'], [type='number'], [type='password'], [type='search'], [type='tel'], [type='text'], [type='time'], [type='url'], [type='week'], input:not([type]), textarea {
    appearance: none;
    background-color: var(--white);
    border: 1px solid var(--gray-light);
    border-radius: 3px;
    box-sizing: border-box;
    margin-bottom: 0.5em;
    padding: 0.66667em;
    width: 100%;
    font-size: 1em;
}

.grid-input {
    display: inline-block;
    width: 3.6em;
    text-align: center;
    padding: 0.1em;
    border-color: var(--gray-light);
    color: var(--text);
}
</style>
