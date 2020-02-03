import { curry, startsWith } from 'ramda';
import getCurrentLangKey from './getCurrentLangKey';
import getValidLangKey from './getValidLangKey';
import getBrowserLanguage from './getBrowserLanguage';
import redirectToHome from './redirectToHome';
import getUserLangKey from './getUserLangKey';
import getSlugAndLang from './getSlugAndLang';
import getPagesPaths from './getPagesPaths';
import isInPagesPaths from './isInPagesPaths';

/**
 * Gets the number of paths in a url
 * @param {*} url pathName
 * @returns {Number} number of paths
 */
const nPaths = url => url.split('/').filter(Boolean).length;

/**
 * Checks if the url is /, /en/ or /pt/
 * @param {*} url this.props.location
 * @param {Boolean} prefixDefault: boolean indicating whether the the urls for the default lang should be prefix or not
 * @param {[String]} langs lang keys ['en', 'fr', 'pt']
 * @returns {Boolean} is home or not
 */
const isHomePage = (url, prefixDefault = true, langs) => {
  if (prefixDefault) {
    if (langs) {
      return nPaths(url) <= 1 && langs.includes(url.split('/').filter(Boolean)[0]);
    } else {
      return nPaths(url) <= 1;
    }
  } else {
    return nPaths(url) === 0 || (nPaths(url) === 1 && langs.includes(url.split('/').filter(Boolean)[0]));
  }
};

/**
 * Add lang to slug
 * @param {String} slug  Slug to add lang
 * @param {String} langKey langKey to add
 * @param {{langKeyDefault: string, prefixDefault: boolean }} options prefixDefault: boolean indicating whether the the urls for the default lang should be prefix or not
 * @returns {String} new slug
 */
const addLangKeyToSlug = curry((slug, langKey, options) => {
  return langKey !== options.langKeyDefault || options.prefixDefault ? `/${langKey}${slug}` : `${slug}`;
});

/**
 * Get url to the language
 * @param {String} homeLink  link to the home page
 * @param {String} url  browser url
 * @param {String} langKey default browser language key
 * @returns {String} new url
 */
const getUrlForLang = curry((homeLink, url, langKey) => {
  return url === '/' || !startsWith(homeLink, url) ? `/${langKey}/` : url.replace(homeLink, `/${langKey}/`);
});

/**
 * Get langs to create Menu
 * @param {[String]} langs lang keys ['en', 'fr', 'pt']
 * @param {String} currentLangKey current Lang Key
 * @param {func} getUrlForLang getUrlForLang curried, waiting for langKey
 * @returns {Array} langs menu data
 */
const getLangs = curry((langs, currentLangKey, getUrlForLang) => {
  return langs.map(langKey => {
    return {
      langKey,
      selected: currentLangKey === langKey,
      link: getUrlForLang(langKey)
    };
  });
});

/**
 * Get i18n obj for the given langKey or first when not found
 * @param {*} i18n Translations object
 * @param {*} langKey langKey
 * @returns {*} i18n[langKey] or i18n[defaultLangKey]
 */
const getI18nBase = curry((i18n, langKey) => i18n[langKey] || Object.values(i18n)[0]);

export {
  addLangKeyToSlug,
  isHomePage,
  isInPagesPaths,
  getBrowserLanguage,
  getCurrentLangKey,
  getPagesPaths,
  getUserLangKey,
  getValidLangKey,
  getI18nBase,
  getLangs,
  getSlugAndLang,
  getUrlForLang,
  nPaths,
  redirectToHome
};
