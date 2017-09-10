import { onCreateNode } from './onCreateNode';

describe('onCreateNode', () => {
  describe('do NOT call createNodeField', () => {
    it('when type != File or MarkdownRemark', () => {
      const node = {
        internal: {
          type: 'other'
        }
      };
      const boundActionCreators = {
        createNodeField: (args) => {
          throw (args);
        }
      };

      onCreateNode({ node, boundActionCreators });
    });

    it('when type = MarkdownRemark but node.slug is not undefined', () => {
      const node = {
        internal: {
          type: 'MarkdownRemark'
        },
        slug: '/en/test/'
      };
      const boundActionCreators = {
        createNodeField: (args) => {
          throw (args);
        }
      };

      onCreateNode({ node, boundActionCreators });
    });
  });
});
