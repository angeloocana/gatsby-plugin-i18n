import _ from 'lodash';
import Promise from 'bluebird';
import path from 'path';
import { getSlugAndLang } from 'ptz-i18n';

const defaultOptions = {
  postPage: 'src/templates/blog-post.js',
  langKeyForNull: 'any',
  langKeyDefault: 'en',
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
};

const logError = (e) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('i18n error:');
  console.log(e);
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
};

exports.createPages = ({ graphql, boundActionCreators }, pluginOptions) => {
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

        // Create blog posts pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
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

        resolve();

      } catch (e) {
        logError(e);
        reject(e);
      }
    });
  });
};

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, boundActionCreators, getNode }, pluginOptions) => {

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`;
    createNodeField({ node, name: 'slug', value: slug });
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const slugAndLang = getSlugAndLang(options.langKeyForNull, node.fileAbsolutePath);

    createNodeField({
      node,
      name: 'langKey',
      value: slugAndLang.langKey
    });

    createNodeField({
      node,
      name: 'slug',
      value: slugAndLang.slug,
    });
  }
};

// Add context.slug and .langKey for react props
exports.onCreatePage = ({ page, boundActionCreators }, pluginOptions) => {
  if (page.context.slug || page.componentPath.indexOf('/pages/') === -1) return null;

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  const { createPage, deletePage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const slugAndLang = getSlugAndLang(options.langKeyDefault, page.componentPath);
    const oldPath = page.path;
    page.path = slugAndLang.slug;
    page.context.slug = slugAndLang.slug;
    page.context.langKey = slugAndLang.langKey;

    deletePage({ path: oldPath });
    createPage(page);

    resolve();
  });
};
