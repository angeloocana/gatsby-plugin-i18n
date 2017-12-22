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

    const result = onCreatePage({ page: oldPage, boundActionCreators }, options);

    assert.equal(result, 'Page created');
  });

  it('create page out site /src/pages/', (done) => {
    const oldPath = '/test.en/';
    const oldPage = {
      componentPath: '/what/ever/test.en.js',
      path: oldPath,
      context: {}
    };

    const options = {
      langKeyDefault: 'pt',
      pagesPaths: ['/what/ever/']
    };

    const expectedPage = {
      path: '/en/test/',
      context: {
        slug: '/en/test/',
        langKey: 'en'
      },
      componentPath: '/what/ever/test.en.js',
      layout: undefined // eslint-disable-line no-undefined
    };

    const boundActionCreators = {
      createPage: (page) => {
        assert.deepEqual(page, expectedPage);
        done();
      },
      deletePage: ({ path }) => assert.equal(path, oldPath)
    };

    const result = onCreatePage({ page: oldPage, boundActionCreators }, options);

    assert.equal(result, 'Page created');
  });

  it('skip page already has slug', () => {
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

    const result = onCreatePage({ page, boundActionCreators });

    assert.equal(result, 'Skipping page already has slug');
  });

  it('skip page not in pagesPaths', () => {
    const page = {
      context: {
      },
      componentPath: '/angeloocana/test.en.js'
    };

    const boundActionCreators = {
      createPage: () => { throw new Error('can not call createPage'); },
      deletePage: () => { throw new Error('can not call deletePage'); }
    };

    const result = onCreatePage({ page, boundActionCreators });

    assert.equal(result, 'Skipping page, not in pagesPaths');
  });
});

