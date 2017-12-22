import { onCreateNode } from './onCreateNode';
import { deepEqual, equal } from 'ptz-assert';

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
          deepEqual(field, expectedField);
          calls += 1;
        } else if (field.name === 'langKey') {
          const expectedField = {
            node, name: 'langKey', value: langKey
          };
          deepEqual(field, expectedField);
          calls += 1;
        }
      }
    };

    const result = onCreateNode({ node, boundActionCreators });

    equal(result, 'langKey and slug added');
    equal(calls, 2);
  });

  it('createNodeField for File', () => {
    const slug = '/en/';
    const langKey = 'en';
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
        if (field.name === 'slug') {
          const expectedField = {
            node, name: 'slug', value: slug
          };
          deepEqual(field, expectedField);
          calls += 1;
        } else if (field.name === 'langKey') {
          const expectedField = {
            node, name: 'langKey', value: langKey
          };
          deepEqual(field, expectedField);
          calls += 1;
        }

      }
    };

    const result = onCreateNode({ node, boundActionCreators });

    equal(result, 'langKey and slug added');
    equal(calls, 1);
  });

  it('ignore File not in pages folder', () => {
    const node = {
      internal: {
        type: 'File'
      },
      absolutePath: '/what/ever/data/index.en.js'
    };

    let calls = 0;

    const boundActionCreators = {
      createNodeField: (field) => {
        calls += 1;
      }
    };

    const result = onCreateNode({ node, boundActionCreators });

    equal(calls, 0);
    equal(result, 'Skipping page, not in pagesPaths');
  });

  it('do NOT call createNodeField when type != File or MarkdownRemark', () => {
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

    const result = onCreateNode({ node, boundActionCreators });

    equal(result, 'Skiping file type: other');
  });
});

