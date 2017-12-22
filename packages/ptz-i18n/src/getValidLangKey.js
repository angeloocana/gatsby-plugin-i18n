import { curry, filter, isNil, startsWith } from 'ramda';

/**
 * Get valid langKey in langs or return defaultLangKey
 * @func
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @returns {String} valid langKey
 */
const getValidLangKey = curry((langs, defaultLangKey, langKey) => {
  if (isNil(langKey)) {
    return defaultLangKey;
  }

  const currentLangKey = filter(l => startsWith(l, langKey), langs);
  return currentLangKey[0] || defaultLangKey;
});

export default getValidLangKey;
