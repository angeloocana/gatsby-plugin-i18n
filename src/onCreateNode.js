import defaultOptions from './defaultOptions';
import path from 'path';
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

export {
  onCreateNode
};
