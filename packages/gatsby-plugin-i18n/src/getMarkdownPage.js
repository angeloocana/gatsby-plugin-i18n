/**
 * Get page from markdownRemark
 * @param {*} options default options + user options
 * @param {*} postPage path.resolve(options.markdownRemark.postPage)
 * @param {*} edge allMarkdownRemark.edges
 * @return {*} page
 */
const getMarkdownPage = (options, postPage) => edge => {
  const path = edge.node.fields.slug;
  const langKey = edge.node.fields.langKey;
  const regexPath = edge.node.fields.path;

  return {
    path, // required
    component: postPage,
    context: {
      path,
      langKey,
      regexPath
    },
    layout: options.useLangKeyLayout ? langKey : null
  };
};

export default getMarkdownPage;
