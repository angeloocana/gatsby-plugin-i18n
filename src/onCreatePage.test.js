import { onCreatePage } from './onCreatePage';
import * as assert from 'ptz-assert';

describe('onCreatePage', () => {
  it('create page', (done) => {
    const oldPath = '/test.en/';
    const oldPage = {
      componentPath: '/src/pages/test.en.js',
      path: oldPath,
      context: {}
    };

    const options = {
      langKeyDefault: 'en',
      useLangKeyLayout: true
    };

    const expectedPage = {
      path: '/en/test/',
      context: {
        slug: '/en/test/',
        langKey: 'en'
      },
      componentPath: '/src/pages/test.en.js',
      layout: 'en'
    };

    const boundActionCreators = {
      createPage: (page) => {
        assert.deepEqual(page, expectedPage);
        done();
      },
      deletePage: ({ path }) => assert.equal(path, oldPath)
    };

    onCreatePage({ page: oldPage, boundActionCreators }, options);
  });

  it('return null if page.context.slug is not empty', () => {
    const page = {
      context: {
        slug: '/en/test/'
      },
      componentPath: '/angeloocana/pages/test.en.js'
    };

    const boundActionCreators = {
      createPage: () => { throw new Error('can not call createPage'); },
      deletePage: () => { throw new Error('can not call deletePage'); }
    };

    onCreatePage({ page, boundActionCreators });
  });

  it('return null if page.componentPath not contains folder pages', () => {
    const page = {
      context: {
        slug: '/en/test/'
      },
      componentPath: '/angeloocana/test.en.js'
    };

    const boundActionCreators = {
      createPage: () => { throw new Error('can not call createPage'); },
      deletePage: () => { throw new Error('can not call deletePage'); }
    };

    onCreatePage({ page, boundActionCreators });
  });
});
