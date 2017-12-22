'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReadNext = exports.getReadNextSelected = exports.getReadNextRandom = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _ptzMath = require('ptz-math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNotNil = _ramda2.default.pipe(_ramda2.default.isNil, _ramda2.default.not);
var isEmpty = function isEmpty(list) {
  return _ramda2.default.not(_ramda2.default.length(list) > 0);
};

/*eslint max-params: ["error", 4]*/

var removePost = function removePost(post, posts) {
  return _ramda2.default.filter(function (p) {
    return p.fields.slug !== post.fields.slug;
  }, posts);
};

var _getReadNextRandom = function _getReadNextRandom(nPosts, posts, readNext) {
  if (isEmpty(posts) || nPosts <= _ramda2.default.length(readNext)) {
    return _ramda2.default.take(nPosts, readNext);
  }

  var randomPost = (0, _ptzMath.getRandomItem)(posts);

  return _getReadNextRandom(nPosts, removePost(randomPost, posts), _ramda2.default.concat(readNext, [randomPost]));
};

/**
 * Concat random posts to readNext list
 * @param {number} nPosts total number of posts
 * @param {Post} post actual post node
 * @param {[Posts]} posts all posts
 * @param {[Post]} readNext read next post list 
 * @returns {[Posts]} random posts
 */
var getReadNextRandom = function getReadNextRandom(nPosts, post, posts, readNext) {
  var getValidPosts = _ramda2.default.filter(function (p) {
    return isNotNil(p) && p.fields.slug !== post.fields.slug && p.fields.langKey === post.fields.langKey;
  });

  var validPosts = getValidPosts(posts);

  return _getReadNextRandom(nPosts, validPosts, readNext);
};

// const getReadNextRandom = (nPosts, post, posts, readNext) => {
//   const validPosts = posts.filter(p =>
//     isNotNil(p) &&
//     p.fields.slug !== post.fields.slug &&
//     p.fields.langKey === post.fields.langKey);
//   const randomPosts = R.range(0, nPosts + 2)
//     .map(_ => getRandomItem(validPosts));
//   return R.take(nPosts, R.concat(readNext, R.uniq(randomPosts)));
// };

/**
 * get read next posts from selected posts in post.frontmatter.readNext
 * @param {*} nPosts total number of posts
 * @param {*} post post to get the selected read next slug list
 * @param {*} posts all posts
 * @returns {[Posts]} selected posts
 */
var getReadNextSelected = function getReadNextSelected(nPosts, post, posts) {
  return !post.frontmatter.readNext || !posts ? [] : _ramda2.default.filter(function (p) {
    return isNotNil(p) && _ramda2.default.contains(p.fields.slug, post.frontmatter.readNext);
  }, posts);
};

/**
 * get read next posts and concat random posts to complete if needed
 * @param {*} nPosts total number of posts
 * @param {*} post post to get the selected read next slug list
 * @param {*} posts all posts
 * @returns {[Posts]} selected posts + random posts
 */
var getReadNext = function getReadNext(nPosts, post, posts) {
  var readNext = getReadNextSelected(nPosts, post, posts);
  return getReadNextRandom(nPosts, post, posts, readNext);
};

exports.getReadNextRandom = getReadNextRandom;
exports.getReadNextSelected = getReadNextSelected;
exports.getReadNext = getReadNext;