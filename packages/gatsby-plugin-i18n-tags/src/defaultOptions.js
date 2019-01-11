const defaultOptions = {
  tagPage: 'src/templates/tag-page.js',
  tagsUrl: '/tags/',
  langKeyForNull: 'any',
  langKeyDefault: 'any',
  prefixDefault: true,
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
