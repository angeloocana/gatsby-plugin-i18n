import defaultOptions from './defaultOptions';
import { getSlugAndLang } from 'ptz-i18n';

/**
 * Add custom url pathname for blog posts.
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {void} void
 */
const onCreateNode = ({ node, boundActionCreators }, pluginOptions) => {

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'File' && node.absolutePath.indexOf('/pages/') > 0) {

    const slugAndLang = getSlugAndLang(options, node.absolutePath);

    createNodeField({
      node,
      name: 'slug',
      value: slugAndLang.slug
    });

  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    var slugAndLang = getSlugAndLang(options, node.fileAbsolutePath);

    createNodeField({
      node,
      name: 'langKey',
      value: slugAndLang.langKey
    });

    createNodeField({
      node,
      name: 'slug',
      value: slugAndLang.slug
    });
  }
};

export {
  onCreateNode
};
