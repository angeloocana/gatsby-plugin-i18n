import { getNewPage } from './getNewPage';
import * as assert from 'ptz-assert';

describe('getNewPage', () => {
  it('no langKey, useLangKeyLayout: false', () => {
    const oldPage = {
      componentPath: '/src/pages/404.js',
      layout: 'index'
    };

    const options = {
      langKeyDefault: 'en',
      useLangKeyLayout: false
    };

    const expectedPage = {
      path: '/404/',
      context: {
        slug: '/404/',
        langKey: 'en'
      },
      componentPath: '/src/pages/404.js',
      layout: 'index'
    };

    const page = getNewPage(oldPage, options);

    assert.deepEqual(page, expectedPage);
  });

  it('no langKey, useLangKeyLayout: true', () => {
    const oldPage = {
      componentPath: '/src/pages/404.js',
      layout: 'index'
    };

    const options = {
      langKeyDefault: 'en',
      useLangKeyLayout: true
    };

    const expectedPage = {
      path: '/404/',
      context: {
        slug: '/404/',
        langKey: 'en'
      },
      componentPath: '/src/pages/404.js',
      layout: 'en'
    };

    const page = getNewPage(oldPage, options);

    assert.deepEqual(page, expectedPage);
  });

  it('langKey: pt, useLangKeyLayout: true', () => {
    const oldPage = {
      componentPath: '/src/pages/index.pt.js',
      layout: 'index'
    };

    const options = {
      langKeyDefault: 'en',
      useLangKeyLayout: true
    };

    const expectedPage = {
      path: '/pt/',
      context: {
        slug: '/pt/',
        langKey: 'pt'
      },
      componentPath: '/src/pages/index.pt.js',
      layout: 'pt'
    };

    const page = getNewPage(oldPage, options);

    assert.deepEqual(page, expectedPage);
  });

  it('langKey: pt, useLangKeyLayout: false', () => {
    const oldPage = {
      componentPath: '/src/pages/index.pt.js',
      layout: 'index'
    };

    const options = {
      langKeyDefault: 'en',
      useLangKeyLayout: false
    };

    const expectedPage = {
      path: '/pt/',
      context: {
        slug: '/pt/',
        langKey: 'pt'
      },
      componentPath: '/src/pages/index.pt.js',
      layout: 'index'
    };

    const page = getNewPage(oldPage, options);

    assert.deepEqual(page, expectedPage);
  });

});
