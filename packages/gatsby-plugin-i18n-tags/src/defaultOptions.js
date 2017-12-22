const defaultOptions = {
  tagPage: 'src/templates/tag-page.js',
  tagsUrl: '/tags/',
  langKeyForNull: 'any',
  query: `
      {
        allMarkdownRemark {
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
};

export {
  defaultOptions
};
