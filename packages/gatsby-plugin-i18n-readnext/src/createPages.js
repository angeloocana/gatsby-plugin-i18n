import { defaultOptions } from './defaultOptions';
import { getReadNext } from './getReadNext';
import R from 'ramda';

const createPages = ({ graphql, boundActionCreators, getNode }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  return new Promise((resolve, reject) => {
    graphql(`
        {
          allMarkdownRemark{
            edges{
              node{
                id,
                excerpt,
                frontmatter{
                  title
                  readNext
                },
                fields{
                  slug
                  langKey
                }
              }
            }
          }
        }
      `).then(result => {
      try {

        if (result.errors) {
          throw result.errors;
        }

        const posts = result.data.allMarkdownRemark.edges
          .filter(R.path(['node', 'fields', 'langKey']))
          .map(edge => edge.node);
        const { createNodeField } = boundActionCreators;

        posts.forEach(post => {
          const readNextPosts = getReadNext(options.nPosts, post, posts)
            .map(p => {
              const node = getNode(p.id);

              return {
                excerpt: p.excerpt,
                frontmatter: {
                  date: node.frontmatter.date,
                  title: p.frontmatter.title
                },
                fields: {
                  langKey: p.fields.langKey,
                  slug: p.fields.slug
                }
              };
            });

          createNodeField({
            node: getNode(post.id),
            name: 'readNextPosts',
            value: readNextPosts
          });
        });

        resolve();

      } catch (e) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log('i18n-readnext createPage error:');
        console.log(e);
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        reject(e);
      }
    });
  });
};

export {
  createPages
};
