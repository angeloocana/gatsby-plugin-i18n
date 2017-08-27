const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const {
  GraphQLString
} = require('graphql');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('src/templates/blog-post.js');
    const tagPages = path.resolve('src/templates/tag-page.js');
    graphql(
      `
        {
          allMarkdownRemark(
            limit: 1000,
            filter: { frontmatter: { draft: { ne: true } } },
          ) {
            edges {
              node {
                fields {
                  slug,
                  langKey
                }
                frontmatter {
                  tags
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log('gatsby-node error:');
        console.log(result.errors);
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        resolve();
        // reject(result.errors);
      }

      // Create blog posts pages.
      _.each(result.data.allMarkdownRemark.edges, edge => {
        const path = edge.node.fields.slug;
        const langKey = edge.node.fields.langKey;
        createPage({
          path, // required
          component: blogPost,
          context: {
            path,
            langKey
          }
        });
      });

      const langTags = result.data.allMarkdownRemark.edges.reduce((tags, edge) => {
        const langKey = edge.node.fields.langKey;
        tags[langKey] = (tags[langKey] || []).concat(edge.node.frontmatter.tags);
        return tags;
      }, {});

      Object.keys(langTags).forEach(langKey => {
        const tags = _.uniq(langTags[langKey])
          .filter(tag => tag && tag !== '');

        tags.forEach(tag => {
          const tagPath = `/${langKey}/tags/${_.kebabCase(tag)}/`;
          createPage({
            path: tagPath,
            component: tagPages,
            context: {
              tag,
              langKey
            },
          });
        });
      });
      resolve();
    });
  });
};

//exports.postBuild = require('./post-build')

const getSlugAndLang = (defaultLangKey, fileAbsolutePath) => {
  try {
    let filePath = fileAbsolutePath.split('/pages')[1];
    const fileName = filePath.split('.');
    const langKey = fileName.length === 3 ? fileName[1] : defaultLangKey;
    const slug = fileName.length === 3
      ? `/${langKey}${fileName[0].replace('/index', '')}/`
      : `${fileName[0].replace('/index', '')}/`;

    return {
      slug,
      langKey
    };
  } catch (e) {
    console.log('fileAbsolutePath', fileAbsolutePath);
    throw e;
  }
};

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`;
    createNodeField({ node, name: 'slug', value: slug });
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const slugAndLang = getSlugAndLang('any', node.fileAbsolutePath);

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

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => {
          return {
            tag,
            link: `/${slugAndLang.langKey}/tags/${_.kebabCase(tag)}/`
          };
        }
      );
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }
  }
};

// Add context.slug and .langKey for react props
exports.onCreatePage = ({ page, boundActionCreators }) => {
  if(page.context.slug || page.componentPath.indexOf('/pages/') === -1)
    return null;

  const { createPage, deletePage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const slugAndLang = getSlugAndLang('en', page.componentPath);
    const oldPath = page.path;
    page.path = slugAndLang.slug;
    page.context.slug = slugAndLang.slug;
    page.context.langKey = slugAndLang.langKey;

    deletePage({ path: oldPath });
    createPage(page);

    resolve();
  });
};
