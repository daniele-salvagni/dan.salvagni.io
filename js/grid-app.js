new Vue({
  el: '#grid-app',

  data: {
    test: 'passed!',
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
