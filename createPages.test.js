'use strict';

var _createPages = require('./createPages');

var _ptzAssert = require('ptz-assert');

describe('createPages', function () {
  it('return Promise', function () {
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
    (0, _ptzAssert.ok)(result);
  });
});