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

  describe('should add langKey in url', () => {

    it('when prefixDefault is true and .langKey matches default', () => {
      const absoluteFilePath = '/what/ever/src/pages/blog/test.en.md';
      const options = {
        langKeyDefault: 'en',
        prefixDefault: true
      };
      const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
      const expected = {
        slug: '/en/blog/test/',
        langKey: 'en',
        redirectTo: null
      };
  
      assert.deepEqual(slugAndLangKey, expected);
    });

    it('when prefixDefault is false and .langKey is different from default', () => {
      const absoluteFilePath = '/what/ever/src/pages/blog/test.pt.md';
      const options = {
        langKeyDefault: 'en',
        prefixDefault: false
      };
      const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
      const expected = {
        slug: '/pt/blog/test/',
        langKey: 'pt',
        redirectTo: null
      };
  
      assert.deepEqual(slugAndLangKey, expected);
    });

  });

  describe('should omit lang in url', () => {

    it('when prefixDefault is false and page lang matches default', () => {
      const absoluteFilePath = '/what/ever/src/pages/blog/test.en.md';
      const options = {
        langKeyDefault: 'en',
        prefixDefault: false
      };
      const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
      const expected = {
        slug: '/blog/test/',
        langKey: 'en',
        redirectTo: null
      };

      assert.deepEqual(slugAndLangKey, expected);
    });

  });

});
