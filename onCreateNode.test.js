'use strict';

var _onCreateNode = require('./onCreateNode');

describe('onCreateNode', function () {
  describe('do NOT call createNodeField', function () {
    it('when type != File or MarkdownRemark', function () {
      var node = {
        internal: {
          type: 'other'
        }
      };
      var boundActionCreators = {
        createNodeField: function createNodeField(args) {
          throw args;
        }
      };

      (0, _onCreateNode.onCreateNode)({ node: node, boundActionCreators: boundActionCreators });
    });

    it('when type = MarkdownRemark but node.slug is not undefined', function () {
      var node = {
        internal: {
          type: 'MarkdownRemark'
        },
        slug: '/en/test/'
      };
      var boundActionCreators = {
        createNodeField: function createNodeField(args) {
          throw args;
        }
      };

      (0, _onCreateNode.onCreateNode)({ node: node, boundActionCreators: boundActionCreators });
    });
  });
});