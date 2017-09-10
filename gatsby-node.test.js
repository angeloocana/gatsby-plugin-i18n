'use strict';

var _gatsbyNode = require('./gatsby-node');

var _ptzAssert = require('ptz-assert');

describe('gatsby-node', function () {
  it('exports createPages', function () {
    (0, _ptzAssert.ok)(_gatsbyNode.createPages);
  });
  it('exports onCreateNode', function () {
    (0, _ptzAssert.ok)(_gatsbyNode.onCreateNode);
  });
  it('exports onCreatePage', function () {
    (0, _ptzAssert.ok)(_gatsbyNode.onCreatePage);
  });
});