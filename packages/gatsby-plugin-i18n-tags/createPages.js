'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPages = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaultOptions = require('./defaultOptions');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logError = require('./logError');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPages = function createPages(_ref, pluginOptions) {
  var graphql = _ref.graphql,
      actions = _ref.actions;
  var createPage = actions.createPage;

  var options = _extends({}, _defaultOptions.defaultOptions, pluginOptions);

  return new Promise(function (resolve, reject) {
    var tagPage = _path2.default.resolve(options.tagPage);
    graphql(options.query).then(function (result) {
      try {

        if (result.errors) {
          throw result.errors;
        }

        var langTags = result.data.allMarkdownRemark.edges.filter(_ramda2.default.path(['node', 'fields', 'langKey'])).reduce(function (tags, edge) {
          var langKey = edge.node.fields.langKey;
          tags[langKey] = (tags[langKey] || []).concat(edge.node.frontmatter.tags);
          return tags;
        }, {});

        Object.keys(langTags).forEach(function (langKey) {
          var tags = _lodash2.default.uniq(langTags[langKey]).filter(function (tag) {
            return tag && tag !== '';
          });

          tags.forEach(function (tag) {
            var tagPath = '/' + langKey + options.tagsUrl + _lodash2.default.kebabCase(tag) + '/';
            createPage({
              path: tagPath,
              component: tagPage,
              context: {
                tag: tag,
                langKey: langKey
              }
            });
          });
        });

        resolve();
      } catch (e) {
        (0, _logError.logError)(e);
        reject(e);
      }
    });
  });
};

exports.createPages = createPages;