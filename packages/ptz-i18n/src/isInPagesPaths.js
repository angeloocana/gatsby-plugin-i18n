import getPagesPaths from './getPagesPaths';
import { compose, contains, filter, isEmpty, not } from 'ramda';

/*
 * Checks if a path is in options.pagesPaths
 * @sig Options -> String -> Boolean
 * @param {{pagesPaths: string[]}} options plugin options
 * @param {String} path path to check
 * @return {Result<Boolean>} is in
 */
const isInPagesPaths = (options, path) => {
  return getPagesPaths(options)
    .map(filter(pagePath => contains(pagePath, path)))
    .map(compose(not, isEmpty));
};

export default isInPagesPaths;
