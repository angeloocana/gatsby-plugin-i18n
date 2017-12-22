import getBrowserLanguage from './getBrowserLanguage';
import getValidLangKey from './getValidLangKey';
import { pipe } from 'ramda';

/**
 * Get user browser valid langKey
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @return {string} valid langKey
 */
const getUserLangKey = (langs, defaultLangKey) =>
  pipe(getBrowserLanguage, getValidLangKey(langs, defaultLangKey))();

export default getUserLangKey;
