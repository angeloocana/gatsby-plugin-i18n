'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    postPage: 'src/templates/blog-post.js',
    langKeyForNull: 'any',
    langKeyDefault: 'en',
    query: '\n    {\n        allMarkdownRemark {\n            edges {\n            node {\n                fields {\n                slug,\n                langKey\n                }\n            }\n            }\n        }\n    }\n    '
};