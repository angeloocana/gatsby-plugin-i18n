'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldsOnGraphQLNodeType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultOptions = require('./defaultOptions');

var _getReadNext = require('./getReadNext');

// Add readNextPosts fields
// Here we can't access the excerpt field
// If we use only the exports.createPages an error happens
var setFieldsOnGraphQLNodeType = function setFieldsOnGraphQLNodeType(args, pluginOptions) {
  var options = _extends({}, _defaultOptions.defaultOptions, pluginOptions);

  return new Promise(function (resolve, reject) {
    var createNodeField = args.boundActionCreators.createNodeField;


    var posts = args.getNodes().filter(function (n) {
      return n.fields && n.fields.langKey && !n.fields.readNextPosts;
    });

    posts.forEach(function (post) {
      var readNextPosts = (0, _getReadNext.getReadNext)(options.nPosts, post, posts).map(function (p) {
        return {
          excerpt: '',
          frontmatter: {
            date: p.frontmatter.date,
            title: p.frontmatter.title
          },
          fields: {
            langKey: p.fields.langKey,
            slug: p.fields.slug
          }
        };
      });

      createNodeField({
        node: post,
        name: 'readNextPosts',
        value: readNextPosts
      });
    });

    resolve();
  });
};

exports.setFieldsOnGraphQLNodeType = setFieldsOnGraphQLNodeType;