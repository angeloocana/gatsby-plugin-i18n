'use strict';

var _createPages = require('./createPages');

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('createPages', function () {
  it('return null when no options.markdownRemark', function () {
    var graphql = function graphql() {
      return null;
    };
    var boundActionCreators = {
      createPage: function createPage() {
        return null;
      }
    };
    var pluginOptions = {};

    var result = (0, _createPages.createPages)({ graphql: graphql, boundActionCreators: boundActionCreators }, pluginOptions);
    assert.notOk(result);
  });

  it('return Promise', function () {
    var graphql = function graphql() {
      return null;
    };
    var boundActionCreators = {
      createPage: function createPage() {
        return null;
      }
    };
    var pluginOptions = {
      markdownRemark: {
        postPage: 'src/templates/blog-post.js',
        query: '\n        {\n            allMarkdownRemark {\n                edges {\n                node {\n                    fields {\n                    slug,\n                    langKey\n                    }\n                }\n                }\n            }\n        }\n        '
      }
    };

    var result = (0, _createPages.createPages)({ graphql: graphql, boundActionCreators: boundActionCreators }, pluginOptions);
    assert.ok(result);
  });
});