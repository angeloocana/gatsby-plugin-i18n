"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logError = void 0;

var logError = function logError() {
  var _console;

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('gatsby-plugin-i18n-tags error:');

  (_console = console).log.apply(_console, arguments);

  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
};

exports.logError = logError;