import defaultOptions from './defaultOptions';
import logError from './logError';
import path from 'path';
import getMarkdownPage from './getMarkdownPage';
import R from 'ramda';

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

        result.data.allMarkdownRemark.edges
          .filter(R.path(['node', 'fields', 'slug']))
          .map(getMarkdownPage(options, postPage))
          .map(page => createPage(page));

        resolve();

      } catch (e) {
        logError(e);
        reject(e);
      }
    });
  });
};

export {
  createPages
};
