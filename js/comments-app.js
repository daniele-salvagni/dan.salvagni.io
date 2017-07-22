Vue.filter('truncate', function(string, value) {
    return string.substring(0, value);
});

new Vue({
  el: '#comments-app',

  data: {
    issueNum: null,
    comments: []
  },

  mounted() {

    this.issueNum = this.$el.getAttribute("data-issue");

    let instance = axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 10000,
      headers: {'Accept': 'application/vnd.github.VERSION.html+json'}
    });

    instance.get('repos/daniele-salvagni/dan.salvagni.io/issues/' + this.issueNum + '/comments')
    //.then(response => console.log(response.data));
    .then(response => this.comments = response.data)
    .catch(function (error) {
      console.log(error);
    });

  }

});
