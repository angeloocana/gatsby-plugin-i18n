'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultOptions = {
  tagPage: 'src/templates/tag-page.js',
  tagsUrl: '/tags/',
  langKeyForNull: 'any',
  langKeyDefault: 'any',
  prefixDefault: true,
  query: '\n      {\n        allMarkdownRemark {\n          edges {\n            node {\n              fields {\n                slug,\n                langKey\n              }\n              frontmatter {\n                tags\n              }\n            }\n          }\n        }\n      }\n    '
};

exports.defaultOptions = defaultOptions;