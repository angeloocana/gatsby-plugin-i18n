import defaultOptions from './defaultOptions';
import { isInPagesPaths, getSlugAndLang } from 'ptz-i18n';
import Result from 'folktale/result';
import { isNil, chain } from 'ramda';

const getValidFile = filePath => 
  isNil(filePath)
    ? Result.Error('No file name')
    : Result.Ok(filePath);

const getFilePath = node => {
  switch(node.internal.type){
  case 'File': return getValidFile(node.absolutePath);
  case 'MarkdownRemark': return getValidFile(node.fileAbsolutePath);
  default: return Result.Error('Skiping file type: ' + node.internal.type);
  }
};


/**
 * Add custom url pathname for blog posts.
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {void} void
 */
const onCreateNode = ({ node, boundActionCreators }, pluginOptions) => {

  const options = {
    ...defaultOptions,
    ...pluginOptions
  };

  return getFilePath(node)
    .map(filePath =>
      chain(isInPaths => {

        if(isInPaths === false){
          return 'Skipping page, not in pagesPaths';
        }

        const slugAndLang = getSlugAndLang(options, filePath);

        const { createNodeField } = boundActionCreators;

        if(node.internal.type === 'MarkdownRemark'){
          createNodeField({
            node,
            name: 'langKey',
            value: slugAndLang.langKey
          });
        }

        createNodeField({
          node,
          name: 'slug',
          value: slugAndLang.slug
        });

        return 'langKey and slug added';
      }, isInPagesPaths(options, filePath))
    )
    .merge();
};

export {
  onCreateNode
};

