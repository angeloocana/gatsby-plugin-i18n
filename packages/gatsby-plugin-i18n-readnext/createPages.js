'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPages = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultOptions = require('./defaultOptions');

var _getReadNext = require('./getReadNext');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPages = function createPages(_ref, pluginOptions) {
  var graphql = _ref.graphql,
      boundActionCreators = _ref.boundActionCreators,
      getNode = _ref.getNode;

  var options = _extends({}, _defaultOptions.defaultOptions, pluginOptions);

  return new Promise(function (resolve, reject) {
    graphql('\n        {\n          allMarkdownRemark{\n            edges{\n              node{\n                id,\n                excerpt,\n                frontmatter{\n                  title\n                  readNext\n                },\n                fields{\n                  slug\n                  langKey\n                }\n              }\n            }\n          }\n        }\n      ').then(function (result) {
      try {

        if (result.errors) {
          throw result.errors;
        }

        var posts = result.data.allMarkdownRemark.edges.filter(_ramda2.default.path(['node', 'fields', 'langKey'])).map(function (edge) {
          return edge.node;
        });
        var createNodeField = boundActionCreators.createNodeField;


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