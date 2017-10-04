import { onCreateNode } from './onCreateNode';
import * as assert from 'ptz-assert';

describe('onCreateNode', () => {
  it('createNodeField for MarkdownRemark', () => {
    const slug = '/en/';
    const langKey = 'en';
    const node = {
      internal: {
        type: 'MarkdownRemark'
      },
      fileAbsolutePath: '/src/pages/index.en.js'
    };

    let calls = 0;

    const boundActionCreators = {
      createNodeField: (field) => {
        if (field.name === 'slug') {
          const expectedField = {
            node, name: 'slug', value: slug
          };
          assert.deepEqual(field, expectedField);
          calls += 1;
        } else if (field.name === 'langKey') {
          const expectedField = {
            node, name: 'langKey', value: langKey
          };
          assert.deepEqual(field, expectedField);
          calls += 1;
        }
      }
    };

    onCreateNode({ node, boundActionCreators });

    assert.equal(calls, 2);
  });

  it('createNodeField for File', () => {
    const slug = '/en/';
    const node = {
      internal: {
        type: 'File'
      },
      slug,
      absolutePath: '/src/pages/index.en.js'
    };

    let calls = 0;

    const boundActionCreators = {
      createNodeField: (field) => {
        const expectedField = {
          node, name: 'slug', value: slug
        };
        assert.deepEqual(field, expectedField);
        calls += 1;
      }
    };

    onCreateNode({ node, boundActionCreators });

    assert.equal(calls, 1);
  });

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

    it('when type = MarkdownRemark but node.slug and node.langKey are not undefined', () => {
      const node = {
        internal: {
          type: 'MarkdownRemark'
        },
        slug: '/en/test/',
        langKey: 'en'
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
