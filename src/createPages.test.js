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

  it('return Promise', () => {
    const graphql = () => null;
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

    const result = createPages({ graphql, boundActionCreators }, pluginOptions);
    assert.ok(result);
  });
});
