import { createPages } from './createPages';
import * as assert from 'ptz-assert';

describe('createPages', () => {
  it('return null when no options.markdownRemark', () => {
    const graphql = () => null;
    const boundActionCreators = {
      createPage: () => null
    };
    const pluginOptions = {

    };

    const result = createPages({ graphql, boundActionCreators }, pluginOptions);
    assert.notOk(result);
  });

  it('create markdown pages', (done) => {
    const graphql = () => Promise.resolve({
      data: {
        allMarkdownRemark: {
          edges: [
            {
              'node': {
                'fields': {
                  'slug': '/pt/blog/functional-programming/examples/',
                  'langKey': 'pt'
                }
              }
            },
            {
              'node': {
                'fields': {
                  'slug': '/en/blog/functional-programming/examples/',
                  'langKey': 'en'
                }
              }
            },
          ]
        }
      }
    });

    const boundActionCreators = {
      createPage: () => null
    };
    const pluginOptions = {
      markdownRemark: {
        postPage: 'src/templates/blog-post.js',
        query: `
        {
            allMarkdownRemark {
                edges {
                node {
                    fields {
                    slug,
                    langKey
                    }
                }
                }
            }
        }
        `
      }
    };

    createPages({ graphql, boundActionCreators }, pluginOptions)
      .then(done);
  });

  it('result.errors', (done) => {
    const graphql = () => Promise.resolve({
      errors: ['error test']
    });

    const boundActionCreators = {
      createPage: () => null
    };

    const pluginOptions = {
      markdownRemark: {
        postPage: 'src/templates/blog-post.js',
        query: `
        {
            allMarkdownRemark {
                edges {
                node {
                    fields {
                    slug,
                    langKey
                    }
                }
                }
            }
        }
        `
      }
    };

    createPages({ graphql, boundActionCreators }, pluginOptions)
      .catch(() => done());
  });
});
