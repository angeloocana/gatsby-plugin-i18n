"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldsOnGraphQLNodeType = void 0;

var _defaultOptions = require("./defaultOptions");

var _getReadNext = require("./getReadNext");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Add readNextPosts fields
// Here we can't access the excerpt field
// If we use only the exports.createPages an error happens
var setFieldsOnGraphQLNodeType = function setFieldsOnGraphQLNodeType(args, pluginOptions) {
  var options = _objectSpread({}, _defaultOptions.defaultOptions, {}, pluginOptions);

  return new Promise(function (resolve, reject) {
    var createNodeField = args.actions.createNodeField;
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