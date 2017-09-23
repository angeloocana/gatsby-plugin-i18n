'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPages = exports.createPageForEach = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _ramda = require('ramda');

var _logError = require('./logError');

var _logError2 = _interopRequireDefault(_logError);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPageForEach = function createPageForEach(createPage, postPage) {
  return (0, _ramda.forEach)(function (edge) {
    var path = edge.node.fields.slug;
    var langKey = edge.node.fields.langKey;
    createPage({
      path: path, // required
      component: postPage,
      context: {
        path: path,
        langKey: langKey
      }
    });
  });
};

var createPages = function createPages(_, pluginOptions) {
  if (!pluginOptions.markdownRemark) {
    return null;
  }

  var options = _extends({}, _defaultOptions2.default, pluginOptions);

  var graphql = _.graphql,
      boundActionCreators = _.boundActionCreators;
  var createPage = boundActionCreators.createPage;


  return new Promise(function (resolve, reject) {
    var postPage = _path2.default.resolve(options.postPage);

    graphql(options.query).then(function (result) {
      try {

        if (result.errors) {
          throw result.errors;
        }

        createPageForEach(createPage, postPage)(result.data.allMarkdownRemark.edges);

        resolve();
      } catch (e) {
        (0, _logError2.default)(e);
        reject(e);
      }
    });
  });
};

exports.createPageForEach = createPageForEach;
exports.createPages = createPages;