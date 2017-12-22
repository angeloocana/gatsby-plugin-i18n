import { curry } from 'ramda';
import getValidLangKey from './getValidLangKey';

/**
 * Get current language key from url.
 * @func
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @param {String} url browser url
 * @returns {String} current langKey
 */
const getCurrentLangKey = curry((langs, defaultLangKey, url) => {
  const langKey = url.split('/')[1];
  return getValidLangKey(langs, defaultLangKey, langKey);
});

export default getCurrentLangKey;
