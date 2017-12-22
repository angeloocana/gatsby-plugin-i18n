import { isNil } from 'ramda';
import Result from 'folktale/result';

/**
 * Get .pagesPaths from pluginOptions
 * @sig Options -> Result String[]
 * @param {{pagesPaths: String[]}} options plugin options
 * @return {Result<String[]>} pagesPaths Result
 */
const getPagesPaths = options => {
  if (isNil(options)) {
    return Result.Error('Null plugin options');
  }

  const { pagesPaths } = options;

  if (isNil(pagesPaths)) {
    return Result.Error('Null pluginOptions.pagesPaths');
  }

  // Should test if pagesPaths is an Array?
  // Should test if pagesPaths is empty?

  return Result.Ok(pagesPaths);
};

export default getPagesPaths;
