"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPages = void 0;

var _defaultOptions = require("./defaultOptions");

var _getReadNext = require("./getReadNext");

var _ramda = _interopRequireDefault(require("ramda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createPages = function createPages(_ref, pluginOptions) {
  var graphql = _ref.graphql,
      actions = _ref.actions,
      getNode = _ref.getNode;

  var options = _objectSpread({}, _defaultOptions.defaultOptions, {}, pluginOptions);

  return new Promise(function (resolve, reject) {
    graphql("\n        {\n          allMarkdownRemark{\n            edges{\n              node{\n                id,\n                excerpt,\n                frontmatter{\n                  title\n                  readNext\n                },\n                fields{\n                  slug\n                  langKey\n                }\n              }\n            }\n          }\n        }\n      ").then(function (result) {
      try {
        if (result.errors) {
          throw result.errors;
        }

        var posts = result.data.allMarkdownRemark.edges.filter(_ramda["default"].path(['node', 'fields', 'langKey'])).map(function (edge) {
          return edge.node;
        });
        var createNodeField = actions.createNodeField;
        posts.forEach(function (post) {
          var readNextPosts = (0, _getReadNext.getReadNext)(options.nPosts, post, posts).map(function (p) {
            var node = getNode(p.id);
            return {
              excerpt: p.excerpt,
              frontmatter: {
                date: node.frontmatter.date,
                title: p.frontmatter.title
              },
              fields: {
                langKey: p.fields.langKey,
                slug: p.fields.slug
              }
            };
          });
          createNodeField({
            node: getNode(post.id),
            name: 'readNextPosts',
            value: readNextPosts
          });
        });
        resolve();
      } catch (e) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log('i18n-readnext createPage error:');
        console.log(e);
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        reject(e);
      }
    });
  });
};

exports.createPages = createPages;