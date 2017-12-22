'use strict';

var _getReadNext = require('./getReadNext');

var _ptzAssert = require('ptz-assert');

var _ramda = require('ramda');

var nPosts = 3;

var postsTestEn1 = {
  fields: {
    slug: '/en/test_1/',
    langKey: 'en'
  }
};

var postsTestEn2 = {
  fields: {
    slug: '/en/test_2/',
    langKey: 'en'
  }
};

var postsTestEn3 = {
  fields: {
    slug: '/en/test_3/',
    langKey: 'en'
  }
};

var postsTestFr1 = {
  fields: {
    slug: '/fr/test_1/',
    langKey: 'fr'
  }
};

var posts = [postsTestFr1, postsTestEn1, undefined, // eslint-disable-line
postsTestEn2, null, postsTestEn3];

var containsOnlyLangKey = function containsOnlyLangKey(langKey, readNext) {
  return (0, _ptzAssert.notOk)((0, _ramda.any)(function (p) {
    return p.fields.langKey !== langKey;
  }, readNext), 'contains other lang keys');
};

describe('getReadNext', function () {
  it('return selected posts', function () {
    var post = {
      frontmatter: {
        readNext: ['/en/test_1/', '/en/test_2/', '/en/test_3/']
      },
      fields: {
        langKey: 'en'
      }
    };

    var readNext = (0, _getReadNext.getReadNext)(nPosts, post, posts);

    var expected = [postsTestEn1, postsTestEn2, postsTestEn3];

    (0, _ptzAssert.deepEqual)(readNext, expected);
  });

  it('return random posts', function () {
    var post = {
      frontmatter: {
        readNext: []
      },
      fields: {
        langKey: 'en'
      }
    };

    var readNext = (0, _getReadNext.getReadNext)(nPosts, post, posts);

    (0, _ptzAssert.equal)(readNext.length, nPosts);
    containsOnlyLangKey(post.fields.langKey, readNext);
  });

  it('complete with random posts', function () {
    var post = {
      frontmatter: {
        readNext: ['/en/test_1/']
      },
      fields: {
        langKey: 'en'
      }
    };

    var readNext = (0, _getReadNext.getReadNext)(nPosts, post, posts);

    (0, _ptzAssert.equal)(readNext.length, nPosts);
    containsOnlyLangKey(post.fields.langKey, readNext);
  });
});