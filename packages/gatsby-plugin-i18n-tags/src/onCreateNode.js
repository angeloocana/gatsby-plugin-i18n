import _ from 'lodash';
import {defaultOptions} from './defaultOptions';
import { getSlugAndLang } from 'ptz-i18n';

/**
 * Add custom url pathname for blog posts.
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {void}
 */
const onCreateNode = ({ node, boundActionCreators, getNode }, pluginOptions) => {

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  const { createNodeField } = boundActionCreators;

  if (node.frontmatter && node.frontmatter.tags &&
        node.fields && !node.fields.tagSlugs) {

    const slugAndLang = getSlugAndLang(options, node.fileAbsolutePath);

    const tagSlugs = node.frontmatter.tags.map(
      tag => {
        return {
          tag,
          link: `/${slugAndLang.langKey}${options.tagsUrl}${_.kebabCase(tag)}/`
        };
      }
    );
    createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
  }
};

export {
  onCreateNode
};
