import { getSlugAndLang } from 'ptz-i18n';

/**
 * Get a new page with langKey, slug and layout
 * @param {*} oldPage page created before by other plugins
 * @param {{langKeyDefault:string, useLangKeyLayout:boolean}} options default options + user options
 * @return {*} new page
 */
const getNewPage = (oldPage, options) => {
  const slugAndLang = getSlugAndLang(options.langKeyDefault, oldPage.componentPath);

  return Object.assign({}, oldPage, {
    path: slugAndLang.slug,
    context: {
      slug: slugAndLang.slug,
      langKey: slugAndLang.langKey
    },
    layout: options.useLangKeyLayout ? slugAndLang.langKey : oldPage.layout
  });
};

export {
  getNewPage
};
