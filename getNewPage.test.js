'use strict';

var _getNewPage = require('./getNewPage');

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('getNewPage', function () {
  it('no langKey, useLangKeyLayout: false', function () {
    var oldPage = {
      componentPath: '/src/pages/404.js',
      layout: 'index'
    };

    var options = {
      langKeyDefault: 'en',
      useLangKeyLayout: false
    };

    var expectedPage = {
      path: '/404/',
      context: {
        slug: '/404/',
        langKey: 'en'
      },
      componentPath: '/src/pages/404.js',
      layout: 'index'
    };

    var page = (0, _getNewPage.getNewPage)(oldPage, options);

    assert.deepEqual(page, expectedPage);
  });

  it('no langKey, useLangKeyLayout: true', function () {
    var oldPage = {
      componentPath: '/src/pages/404.js',
      layout: 'index'
    };

    var options = {
      langKeyDefault: 'en',
      useLangKeyLayout: true
    };

    var expectedPage = {
      path: '/404/',
      context: {
        slug: '/404/',
        langKey: 'en'
      },
      componentPath: '/src/pages/404.js',
      layout: 'en'
    };

    var page = (0, _getNewPage.getNewPage)(oldPage, options);

    assert.deepEqual(page, expectedPage);
  });

  it('langKey: pt, useLangKeyLayout: true', function () {
    var oldPage = {
      componentPath: '/src/pages/index.pt.js',
      layout: 'index'
    };

    var options = {
      langKeyDefault: 'en',
      useLangKeyLayout: true
    };

    var expectedPage = {
      path: '/pt/',
      context: {
        slug: '/pt/',
        langKey: 'pt'
      },
      componentPath: '/src/pages/index.pt.js',
      layout: 'pt'
    };

    var page = (0, _getNewPage.getNewPage)(oldPage, options);

    assert.deepEqual(page, expectedPage);
  });

  it('langKey: pt, useLangKeyLayout: false', function () {
    var oldPage = {
      componentPath: '/src/pages/index.pt.js',
      layout: 'index'
    };

    var options = {
      langKeyDefault: 'en',
      useLangKeyLayout: false
    };

    var expectedPage = {
      path: '/pt/',
      context: {
        slug: '/pt/',
        langKey: 'pt'
      },
      componentPath: '/src/pages/index.pt.js',
      layout: 'index'
    };

    var page = (0, _getNewPage.getNewPage)(oldPage, options);

    assert.deepEqual(page, expectedPage);
  });
});