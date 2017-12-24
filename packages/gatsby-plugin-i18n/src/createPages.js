import defaultOptions from './defaultOptions';
import logError from './logError';
import path from 'path';
import getMarkdownPage from './getMarkdownPage';
import R from 'ramda';

// Test git

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
        const langHashTree = {};
        // initiliaze tempLangKeys
        const tempLangKeys = Object.create(null);
        options.langKeys.map(key => {
          tempLangKeys[key] = false;
          return key;
        });

        result.data.allMarkdownRemark.edges
          .filter(R.path(['node', 'fields', 'slug']))
          .map(item => {
            langHashTree[item.node.fields.path] = Object.assign({}, tempLangKeys, langHashTree[item.node.fields.path]);
            langHashTree[item.node.fields.path][`${item.node.fields.langKey}`] = true;
            return item;
          })
          .map(getMarkdownPage(options, postPage))
          .map(page => {
            const tmpPages = Object.keys(langHashTree[page.context.regexPath])
              .filter(key => !langHashTree[page.context.regexPath][key] )
              .map(key => {
                langHashTree[page.context.regexPath][`${key}`] = true;
                return Object.assign({}, page, {
                  path: `/${key}${page.context.regexPath}`,
                  context: {
                    langKey: key,
                    path: `/${key}${page.context.regexPath}`,
                    regexPath: page.context.regexPath
                  }
                });
              });
            if(tmpPages.length > 0) {
              tmpPages.map(stubPage => {
                return createPage(stubPage);
              });
            }
            return createPage(page);
          });
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
