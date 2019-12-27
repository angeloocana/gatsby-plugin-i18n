"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPages = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _defaultOptions = require("./defaultOptions");

var _path = _interopRequireDefault(require("path"));

var _logError = require("./logError");

var _ramda = _interopRequireDefault(require("ramda"));

var _ptzI18n = require("ptz-i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createPages = function createPages(_ref, pluginOptions) {
  var graphql = _ref.graphql,
      actions = _ref.actions;
  var createPage = actions.createPage;

  var options = _objectSpread({}, _defaultOptions.defaultOptions, {}, pluginOptions);

  return new Promise(function (resolve, reject) {
    var tagPage = _path["default"].resolve(options.tagPage);

    graphql(options.query).then(function (result) {
      try {
        if (result.errors) {
          throw result.errors;
        }

        var langTags = result.data.allMarkdownRemark.edges.filter(_ramda["default"].path(['node', 'fields', 'langKey'])).reduce(function (tags, edge) {
          var langKey = edge.node.fields.langKey;
          tags[langKey] = (tags[langKey] || []).concat(edge.node.frontmatter.tags);
          return tags;
        }, {});
        Object.keys(langTags).forEach(function (langKey) {
          var tags = _lodash["default"].uniq(langTags[langKey]).filter(function (tag) {
            return tag && tag !== '';
          });

          tags.forEach(function (tag) {
            var tagPath = "".concat(options.tagsUrl).concat(_lodash["default"].kebabCase(tag), "/");
            createPage({
              path: (0, _ptzI18n.addLangKeyToSlug)(tagPath, langKey, options),
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