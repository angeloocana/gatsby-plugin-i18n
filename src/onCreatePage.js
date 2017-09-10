import defaultOptions from './defaultOptions';
import { getSlugAndLang } from 'ptz-i18n';

/**
 * Add context.slug and .langKey for react props
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {Promise} Promise
 */
const onCreatePage = ({ page, boundActionCreators }, pluginOptions) => {
  if (page.context.slug || page.componentPath.indexOf('/pages/') === -1) return null;
  
  const options = {
    ...defaultOptions,
    ...pluginOptions
  };
  
  const { createPage, deletePage } = boundActionCreators;
  
  return new Promise((resolve, reject) => {
    const slugAndLang = getSlugAndLang(options.langKeyDefault, page.componentPath);
    const oldPath = page.path;
    page.path = slugAndLang.slug;
    page.context.slug = slugAndLang.slug;
    page.context.langKey = slugAndLang.langKey;
  
    deletePage({ path: oldPath });
    createPage(page);
  
    resolve();
  });
};

export {
  onCreatePage
};
