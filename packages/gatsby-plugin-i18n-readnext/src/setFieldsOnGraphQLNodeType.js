import {defaultOptions} from './defaultOptions';
import {getReadNext} from './getReadNext';

// Add readNextPosts fields
// Here we can't access the excerpt field
// If we use only the exports.createPages an error happens
const setFieldsOnGraphQLNodeType = (args, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions
  };
  
  return new Promise(function (resolve, reject) {
    const { createNodeField } = args.actions;
  
    const posts = args.getNodes().filter(n => n.fields && n.fields.langKey && !n.fields.readNextPosts);
  
    posts.forEach(post => {
      const readNextPosts = getReadNext(options.nPosts, post, posts)
        .map(p => {
          return {
            excerpt: '',
            frontmatter: {
              date: p.frontmatter.date,
              title: p.frontmatter.title
            },
            fields: {
              langKey: p.fields.langKey,
              slug: p.fields.slug
            }
          };
        });
  
      createNodeField({
        node: post,
        name: 'readNextPosts',
        value: readNextPosts
      });
    });
  
    resolve();
  });
};

export {
  setFieldsOnGraphQLNodeType
};
