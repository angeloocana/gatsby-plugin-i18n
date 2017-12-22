import { getSlugAndLang } from './index';
import * as assert from 'ptz-assert';

describe('getSlugAndLang', () => {
  it('.pt file', () => {
    const absoluteFilePath = '/what/ever/src/pages/blog/test.pt.md';
    const slugAndLangKey = getSlugAndLang('en', absoluteFilePath);
    const expected = {
      slug: '/pt/blog/test/',
      langKey: 'pt',
      redirectTo: null
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('no .langKey file', () => {
    const absoluteFilePath = '/what/ever/src/pages/test.md';
    const slugAndLangKey = getSlugAndLang('any', absoluteFilePath);
    const expected = {
      slug: '/test/',
      langKey: 'any',
      redirectTo: null
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('index.pt file', () => {
    const absoluteFilePath = '/what/ever/src/pages/blog/index.pt.md';
    const slugAndLangKey = getSlugAndLang('en', absoluteFilePath);
    const expected = {
      slug: '/pt/blog/',
      langKey: 'pt',
      redirectTo: null
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('index no .langKey file', () => {
    const absoluteFilePath = '/what/ever/src/pages/index.md';
    const slugAndLangKey = getSlugAndLang('en', absoluteFilePath);
    const expected = {
      slug: '/',
      langKey: 'en',
      redirectTo: '/en/'
    };

    assert.deepEqual(slugAndLangKey, expected);
  });


  it('pagesPaths /custom/folder/', () => {
    const absoluteFilePath = '/custom/folder/blog/test.pt.md';
    const options = {
      pagesPaths: ['/custom/folder/'],
      langKeyDefault: 'en'
    };
    const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
    const expected = {
      slug: '/pt/blog/test/',
      langKey: 'pt',
      redirectTo: null
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('pagesPaths /custom/folder', () => {
    const absoluteFilePath = '/custom/folder/blog/test.md';
    const options = {
      pagesPaths: ['/custom/folder'],
      langKeyDefault: 'en'
    };
    const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
    const expected = {
      slug: '/blog/test/',
      langKey: 'en',
      redirectTo: null
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('index.pt pagesPaths /custom/folder/', () => {
    const absoluteFilePath = '/custom/folder/blog/index.pt.md';
    const options = {
      pagesPaths: ['/custom/folder/'],
      langKeyDefault: 'en'
    };
    const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
    const expected = {
      slug: '/pt/blog/',
      langKey: 'pt',
      redirectTo: null
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('index pagesPaths /custom/folder', () => {
    const absoluteFilePath = '/custom/folder/blog/index.md';
    const options = {
      pagesPaths: ['/custom/folder'],
      langKeyDefault: 'en'
    };
    const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
    const expected = {
      slug: '/blog/',
      langKey: 'en',
      redirectTo: null
    };

    assert.deepEqual(slugAndLangKey, expected);
  });
});
