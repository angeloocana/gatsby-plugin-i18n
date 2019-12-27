"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onCreateNode = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _defaultOptions = require("./defaultOptions");

var _ptzI18n = require("ptz-i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Add custom url pathname for blog posts.
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {void}
 */
var onCreateNode = function onCreateNode(_ref, pluginOptions) {
  var node = _ref.node,
      actions = _ref.actions,
      getNode = _ref.getNode;

  var options = _objectSpread({}, _defaultOptions.defaultOptions, {}, pluginOptions);

  var createNodeField = actions.createNodeField;

  if (node.frontmatter && node.frontmatter.tags && node.fields && !node.fields.tagSlugs) {
    var slugAndLang = (0, _ptzI18n.getSlugAndLang)(options, node.fileAbsolutePath);
    var tagSlugs = node.frontmatter.tags.map(function (tag) {
      return {
        tag: tag,
        link: (0, _ptzI18n.addLangKeyToSlug)("".concat(options.tagsUrl).concat(_lodash["default"].kebabCase(tag), "/"), slugAndLang.langKey, options)
      };
    });
    createNodeField({
      node: node,
      name: 'tagSlugs',
      value: tagSlugs
    });
  }
};

exports.onCreateNode = onCreateNode;