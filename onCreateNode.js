'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onCreateNode = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ptzI18n = require('ptz-i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add custom url pathname for blog posts.
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {void} void
 */
var onCreateNode = function onCreateNode(_ref, pluginOptions) {
  var node = _ref.node,
      boundActionCreators = _ref.boundActionCreators;


  var options = _extends({}, _defaultOptions2.default, pluginOptions);

  var createNodeField = boundActionCreators.createNodeField;


  if (node.internal.type === 'File') {
    var parsedFilePath = _path2.default.parse(node.absolutePath);
    var slug = '/' + parsedFilePath.dir.split('---')[1] + '/';
    createNodeField({ node: node, name: 'slug', value: slug });
  } else if (node.internal.type === 'MarkdownRemark' && typeof node.slug === 'undefined') {
    var slugAndLang = (0, _ptzI18n.getSlugAndLang)(options.langKeyForNull, node.fileAbsolutePath);

    createNodeField({
      node: node,
      name: 'langKey',
      value: slugAndLang.langKey
    });

    createNodeField({
      node: node,
      name: 'slug',
      value: slugAndLang.slug
    });
  }
};

exports.onCreateNode = onCreateNode;