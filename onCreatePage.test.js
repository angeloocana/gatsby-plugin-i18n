'use strict';

var _onCreatePage = require('./onCreatePage');

var _ptzAssert = require('ptz-assert');

describe('onCreatePage', function () {
  it('return null if page.context.slug is not empty', function () {
    var page = {
      context: {
        slug: '/en/test/'
      },
      componentPath: '/angeloocana/pages/test.en.js'
    };

    var result = (0, _onCreatePage.onCreatePage)({ page: page });

    (0, _ptzAssert.notOk)(result);
  });

  it('return null if page.componentPath not contains folder pages', function () {
    var page = {
      context: {
        slug: '/en/test/'
      },
      componentPath: '/angeloocana/test.en.js'
    };

    var result = (0, _onCreatePage.onCreatePage)({ page: page });

    (0, _ptzAssert.notOk)(result);
  });
});