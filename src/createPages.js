import defaultOptions from './defaultOptions';
import { forEach } from 'ramda';
import logError from './logError';
import path from 'path';

const createPageForEach = (createPage, postPage) => forEach(edge => {
  const path = edge.node.fields.slug;
  const langKey = edge.node.fields.langKey;
  createPage({
    path, // required
    component: postPage,
    context: {
      path,
      langKey
    }
  });
});

const createPages = (_, pluginOptions) => {  
  if (!pluginOptions.markdownRemark) {
    return null;
  }

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  const { graphql, boundActionCreators } = _;
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve(options.markdownRemark.postPage);

    graphql(options.markdownRemark.query).then(result => {
      try {

        if (result.errors) {
          throw result.errors;
        }

        createPageForEach(createPage, postPage)(result.data.allMarkdownRemark.edges);

        resolve();

      } catch (e) {
        logError(e);
        reject(e);
      }
    });
  });
};

export {
  createPageForEach,
  createPages
};
