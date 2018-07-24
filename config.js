let highlighter = require('highlighter');

module.exports = {

  // Global ------------------------------------------------------------------------------
  "styles": {
    "include": []
  },

  // Metalsmith --------------------------------------------------------------------------
  "metalsmith": {
    "metadata": {
      "site": {
        "url": "https://dan.salvagni.io",
        "name": "Daniele Salvagni",
        "issuePage": "https://github.com/daniele-salvagni/dan.salvagni.io/issues/",
        "footnote": "Made with ❤ by Daniele Salvagni"
      }
    },

    "config": {
      "contentRoot": "./content",
      "assetRoot": "./assets",
      "styleRoot": "./styles",
      "layoutRoot": "./layouts",
      "destRoot": "./build"
    },

    // Metalsmith Plugins ----------------------------------------------------------------
    "plugins": {
      "metalsmith-drafts": {},
      "metalsmith-markdown": {
        "smartypants": true,
        "smartLists": true,
        "gfm": true,
        "tables": true,
        "highlight": highlighter(),
        "langPrefix":"hljs lang-"
      },
      "metalsmith-date-formatter": {
        "dates": {
          "key": "date",
          "format": "MMMM DD, YYYY"
        }
      },
      "metalsmith-collections": {
        "blog": {
          "sortBy": "date",
          "reverse": true
        },
        "software": {
          "sortBy": "title",
          "reverse": false
        }
      },
      "metalsmith-permalinks": {
        "relative": false,

        "linksets": [{
          "match": { "collection": "blog" },
          "pattern": "b/:title"
        },{
          "match": { "collection": "software" },
          "pattern": "s/:title"
        },{
          "match": { "function": "bloglist" },
          "pattern": "b"
      }]
      },
      "metalsmith-layouts": {
        "engine": "handlebars",
        "directory": "./layouts",
        "partials": "./layouts/partials"
      },
      "metalsmith-concat": {
        "output": "assets/app.js",
        "files": [
          "vue/dist/vue.min.js", // will be resolved from the node_modules
          "axios/dist/axios.min.js",
          "comments-app.js", // will be resolved from the directory given to Metalsmith
          "grid-app.js"
        ],
        "searchPaths": [ 'node_modules', 'js' ]
      },"metalsmith-concat": {
        "output": "assets/app2.js",
        "files": [
          "vue/dist/vue.min.js",
          "grid-app.js"
        ],
        "searchPaths": [ 'node_modules', 'js' ]
      },
      "metalsmith-assets": {
        "source": "./assets",
        "destination": "./assets"
      }
    }
  }

};
