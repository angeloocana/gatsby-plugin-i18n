import * as assert from 'ptz-assert';
import getMarkdownPage from './getMarkdownPage';

describe('getMarkdownPage', () => {
  it('langKey: pt, useLangKeyLayout: true', () => {
    const options = {
      useLangKeyLayout: true
    };

    const langKey = 'pt';
    const slug = '/pt/blog/functional-programming/examples/';

    const edge = {
      'node': {
        'fields': {
          slug,
          langKey
        }
      }
    };

    const postPage = {
      test: 'test'
    };

    const expectedPage = {
      component: postPage,
      context: {
        langKey,
        path: slug,
        slug,
      },
      layout: langKey,
      path: slug
    };

    const page = getMarkdownPage(options, postPage)(edge);

    assert.deepEqual(page, expectedPage);
  });

  it('langKey: pt, useLangKeyLayout: false', () => {
    const options = {
      useLangKeyLayout: false
    };

    const langKey = 'pt';
    const slug = '/pt/blog/functional-programming/examples/';

    const edge = {
      'node': {
        'fields': {
          slug,
          langKey
        }
      }
    };

    const postPage = {
      test: 'test'
    };

    const expectedPage = {
      component: postPage,
      context: {
        langKey,
        path: slug,
        slug,
      },
      layout: null,
      path: slug
    };

    const page = getMarkdownPage(options, postPage)(edge);

    assert.deepEqual(page, expectedPage);
  });
});
