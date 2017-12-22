import R from 'ramda';
import { getRandomItem } from 'ptz-math';

const isNotNil = R.pipe(R.isNil, R.not);
const isEmpty = (list) => R.not(R.length(list) > 0);

/*eslint max-params: ["error", 4]*/

const removePost = (post, posts) => R.filter(p => p.fields.slug !== post.fields.slug, posts);

const _getReadNextRandom = (nPosts, posts, readNext) => {
  if (isEmpty(posts) || nPosts <= R.length(readNext)) {
    return R.take(nPosts, readNext);
  }

  const randomPost = getRandomItem(posts);

  return _getReadNextRandom(nPosts, removePost(randomPost, posts), R.concat(readNext, [randomPost]));
};

/**
 * Concat random posts to readNext list
 * @param {number} nPosts total number of posts
 * @param {Post} post actual post node
 * @param {[Posts]} posts all posts
 * @param {[Post]} readNext read next post list 
 * @returns {[Posts]} random posts
 */
const getReadNextRandom = (nPosts, post, posts, readNext) => {
  const getValidPosts = R.filter(p =>
    isNotNil(p) &&
    p.fields.slug !== post.fields.slug &&
    p.fields.langKey === post.fields.langKey);
  
  const validPosts = getValidPosts(posts);
    
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
const getReadNextSelected = (nPosts, post, posts) => {
  return !post.frontmatter.readNext || !posts
    ? []
    : R.filter(p =>
      isNotNil(p) &&
      R.contains(p.fields.slug, post.frontmatter.readNext)
      , posts);
};

/**
 * get read next posts and concat random posts to complete if needed
 * @param {*} nPosts total number of posts
 * @param {*} post post to get the selected read next slug list
 * @param {*} posts all posts
 * @returns {[Posts]} selected posts + random posts
 */
const getReadNext = (nPosts, post, posts) => {
  const readNext = getReadNextSelected(nPosts, post, posts);
  return getReadNextRandom(nPosts, post, posts, readNext);
};

export {
  getReadNextRandom,
  getReadNextSelected,
  getReadNext
};
