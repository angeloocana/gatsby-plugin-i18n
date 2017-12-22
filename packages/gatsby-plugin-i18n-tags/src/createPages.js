import _ from 'lodash';
import {defaultOptions} from './defaultOptions';
import path from 'path';
import {logError} from './logError';
import R from 'ramda';

const createPages = ({ graphql, boundActionCreators }, pluginOptions) => {
  const { createPage } = boundActionCreators;
  const options = {
    ...defaultOptions,
    ...pluginOptions
  };
  
  return new Promise((resolve, reject) => {
    const tagPage = path.resolve(options.tagPage);
    graphql(options.query).then(result => {
      try {
  
        if (result.errors) {
          throw result.errors;
        }
  
        const langTags = result.data.allMarkdownRemark.edges
          .filter(R.path(['node', 'fields', 'langKey']))
          .reduce((tags, edge) => {
            const langKey = edge.node.fields.langKey;
            tags[langKey] = (tags[langKey] || []).concat(edge.node.frontmatter.tags);
            return tags;
          }, {});
  
        Object.keys(langTags).forEach(langKey => {
          const tags = _.uniq(langTags[langKey])
            .filter(tag => tag && tag !== '');
  
          tags.forEach(tag => {
            const tagPath = `/${langKey}${options.tagsUrl}${_.kebabCase(tag)}/`;
            createPage({
              path: tagPath,
              component: tagPage,
              context: {
                tag,
                langKey
              },
            });
          });
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
