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
        "url": "https://dan.salvagni.io"
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
      "metalsmith-permalinks": {
        "pattern": ":collection/:title",
        "relative": false
      },
      "metalsmith-collections": {
        "b": {
          "sortBy": "date",
          "reverse": true
        }
      },
      "metalsmith-layouts": {
        "engine": "handlebars",
        "directory": "./layouts",
        "partials": "./layouts/partials"
      },
      "metalsmith-assets": {
        "source": "./assets",
        "destination": "./"
      }
    }
  }

};
