import _ from 'lodash';
import {defaultOptions} from './defaultOptions';
import { getSlugAndLang } from 'ptz-i18n';

/**
 * Add custom url pathname for blog posts.
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {void}
 */
const onCreateNode = ({ node, actions, getNode }, pluginOptions) => {

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  const { createNodeField } = actions;

  if (node.frontmatter && node.frontmatter.tags &&
        node.fields && !node.fields.tagSlugs) {

    const slugAndLang = getSlugAndLang(options, node.fileAbsolutePath);

    const tagSlugs = node.frontmatter.tags.map(
      tag => {
        const shouldPrefix = slugAndLang.langKey !== options.langKeyDefault || options.prefixDefault;
        return {
          tag,
          link: `${shouldPrefix ? '/' + slugAndLang.langKey : ''}${options.tagsUrl}${_.kebabCase(tag)}/`
        };
      }
    );
    createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
  }
};

export {
  onCreateNode
};
