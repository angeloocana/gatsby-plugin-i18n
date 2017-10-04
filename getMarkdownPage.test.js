'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _getMarkdownPage = require('./getMarkdownPage');

var _getMarkdownPage2 = _interopRequireDefault(_getMarkdownPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('getMarkdownPage', function () {
  it('langKey: pt, useLangKeyLayout: true', function () {
    var options = {
      useLangKeyLayout: true
    };

    var langKey = 'pt';
    var slug = '/pt/blog/functional-programming/examples/';

    var edge = {
      'node': {
        'fields': {
          slug: slug,
          langKey: langKey
        }
      }
    };

    var postPage = {
      test: 'test'
    };

    var expectedPage = {
      component: postPage,
      context: {
        langKey: langKey,
        path: slug
      },
      layout: langKey,
      path: slug
    };

    var page = (0, _getMarkdownPage2.default)(options, postPage)(edge);

    assert.deepEqual(page, expectedPage);
  });

  it('langKey: pt, useLangKeyLayout: false', function () {
    var options = {
      useLangKeyLayout: false
    };

    var langKey = 'pt';
    var slug = '/pt/blog/functional-programming/examples/';

    var edge = {
      'node': {
        'fields': {
          slug: slug,
          langKey: langKey
        }
      }
    };

    var postPage = {
      test: 'test'
    };

    var expectedPage = {
      component: postPage,
      context: {
        langKey: langKey,
        path: slug
      },
      layout: null,
      path: slug
    };

    var page = (0, _getMarkdownPage2.default)(options, postPage)(edge);

    assert.deepEqual(page, expectedPage);
  });
});