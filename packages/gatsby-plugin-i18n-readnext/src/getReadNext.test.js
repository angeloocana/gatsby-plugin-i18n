import { getReadNext } from './getReadNext';
import { deepEqual, equal, notOk } from 'ptz-assert';
import { any } from 'ramda';

const nPosts = 3;

const postsTestEn1 = {
  fields: {
    slug: '/en/test_1/',
    langKey: 'en'
  }
};

const postsTestEn2 = {
  fields: {
    slug: '/en/test_2/',
    langKey: 'en'
  }
};

const postsTestEn3 = {
  fields: {
    slug: '/en/test_3/',
    langKey: 'en'
  }
};

const postsTestFr1 = {
  fields: {
    slug: '/fr/test_1/',
    langKey: 'fr'
  }
};

const posts = [
  postsTestFr1,
  postsTestEn1,
  undefined, // eslint-disable-line
  postsTestEn2,
  null,
  postsTestEn3
];

const containsOnlyLangKey = (langKey, readNext) => 
  notOk(any(p => p.fields.langKey !== langKey, readNext), 'contains other lang keys');

describe('getReadNext', () => {
  it('return selected posts', () => {
    const post = {
      frontmatter: {
        readNext: [
          '/en/test_1/',
          '/en/test_2/',
          '/en/test_3/'
        ]
      },
      fields: {
        langKey: 'en'
      }
    };

    const readNext = getReadNext(nPosts, post, posts);

    const expected = [
      postsTestEn1,
      postsTestEn2,
      postsTestEn3
    ];

    deepEqual(readNext, expected);    
  });

  it('return random posts', () => {
    const post = {
      frontmatter: {
        readNext: []
      },
      fields: {
        langKey: 'en'
      }
    };

    const readNext = getReadNext(nPosts, post, posts);

    equal(readNext.length, nPosts);
    containsOnlyLangKey(post.fields.langKey, readNext);
  });

  it('complete with random posts', () => {
    const post = {
      frontmatter: {
        readNext: [
          '/en/test_1/'
        ]
      },
      fields: {
        langKey: 'en'
      }
    };

    const readNext = getReadNext(nPosts, post, posts);

    equal(readNext.length, nPosts);
    containsOnlyLangKey(post.fields.langKey, readNext);
  });
});
