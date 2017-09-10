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

const createPages = ({ graphql, boundActionCreators }, pluginOptions) => {
  const { createPage } = boundActionCreators;
  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  return new Promise((resolve, reject) => {
    const postPage = path.resolve(options.postPage);

    graphql(options.query).then(result => {
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
