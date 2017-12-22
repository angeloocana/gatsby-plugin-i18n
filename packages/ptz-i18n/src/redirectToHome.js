import getUserLangKey from './getUserLangKey';

/**
 * Redirect to user language home page, from: / to: /langKey/
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @return {void}
 */
const redirectToHome = (langs, defaultLangKey) => {
  if(typeof window === 'undefined'){
    return;
  }

  const langKey = getUserLangKey(langs, defaultLangKey);
  const newUrl = `/${langKey}/`;  
  window.location.replace(newUrl);
};

export default redirectToHome;
