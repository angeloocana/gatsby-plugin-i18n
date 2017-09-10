'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onCreatePage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _ptzI18n = require('ptz-i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add context.slug and .langKey for react props
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {Promise} Promise
 */
var onCreatePage = function onCreatePage(_ref, pluginOptions) {
  var page = _ref.page,
      boundActionCreators = _ref.boundActionCreators;

  if (page.context.slug || page.componentPath.indexOf('/pages/') === -1) return null;

  var options = _extends({}, _defaultOptions2.default, pluginOptions);

  var createPage = boundActionCreators.createPage,
      deletePage = boundActionCreators.deletePage;


  return new Promise(function (resolve, reject) {
    var slugAndLang = (0, _ptzI18n.getSlugAndLang)(options.langKeyDefault, page.componentPath);
    var oldPath = page.path;
    page.path = slugAndLang.slug;
    page.context.slug = slugAndLang.slug;
    page.context.langKey = slugAndLang.langKey;

    deletePage({ path: oldPath });
    createPage(page);

    resolve();
  });
};

exports.onCreatePage = onCreatePage;