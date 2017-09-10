'use strict';

var _gatsbyNode = require('./gatsby-node');

var Api = _interopRequireWildcard(_gatsbyNode);

var _ptzAssert = require('ptz-assert');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('gatsby-node', function () {
  it('export only known functions', function () {
    var fns = ['createPages', 'onCreateNode', 'onCreatePage'];
    (0, _ptzAssert.deepEqual)(Object.keys(Api), fns);
  });
});