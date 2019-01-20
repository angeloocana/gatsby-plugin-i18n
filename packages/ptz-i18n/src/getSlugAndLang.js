import { compose, curry, isNil, head, not, startsWith, endsWith } from 'ramda';
import { addLangKeyToSlug } from './index';

const defaultPagesPaths = ['/src/pages/'];

const getPagesPaths = options =>
  (options && options.pagesPaths) || defaultPagesPaths;

const getLangKeyDefault = options =>
  (options && options.langKeyDefault) || options;

const addSlashStart = fileName =>
  startsWith('/', fileName) ? fileName : '/' + fileName;

const addSlashEnd = fileName =>
  endsWith('/', fileName) ? fileName : fileName + '/';

const addSlash = compose(addSlashStart, addSlashEnd);

/**
 * Get slug (path) and langKey for a given file path.
 *
 * Used by gatsby-plugin-i18n and gatsby-plugin-i18n-tags
 *
 * @param {{langKeyDefault: string, pagesPaths: string[], prefixDefault: boolean }} options plugin options
 * @param {String} fileAbsolutePath local file absolute path
 * @return {{slug: string, langKey: string, redirectTo: string}} slug and langKey
 */
const getSlugAndLang = curry((options, fileAbsolutePath) => {
  const slugsAndLangs = getPagesPaths(options).map(pagesPath => {
    const filePath = `safeStartToSplit-${fileAbsolutePath}`.split(pagesPath)[1];

    if (isNil(filePath)) {
      return null;
    }

    const langKeyDefault = getLangKeyDefault(options);
    const fileName = filePath.split('.');
    const langKey = fileName.length === 3 ? fileName[1] : langKeyDefault;
    const title = addSlash(fileName[0].replace('index', '') );
    const slug = fileName.length === 3 ? addLangKeyToSlug(title, langKey, options) : title;

    const path = addSlash(fileName[0].replace('index', ''));

    return {
      slug,
      langKey,
      path,
      redirectTo: slug === '/' ? addSlash(langKeyDefault) : null
    };
  });

  return head(slugsAndLangs.filter(compose(not, isNil)));
});

export default getSlugAndLang;
