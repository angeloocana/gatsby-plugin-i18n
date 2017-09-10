export default {
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
