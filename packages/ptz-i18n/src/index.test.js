import {
  addLangKeyToSlug,
  getLangs,
  getUrlForLang,
  getI18nBase,
  isHomePage
} from './index';
import * as assert from 'ptz-assert';

describe('langs', () => {
  describe('addLangKeyToSlug', () => {
    it('should add lang key to slug', () => {
      const slug = '/about/';
      const langKey = 'en';
      const options = {};
      assert.equal(addLangKeyToSlug(slug, langKey, options), '/en/about/');
    });
    it('should omit the lang key in the slug when prefixDefault is false', () => {
      const slug = '/about/';
      const langKey = 'en';
      const options = {langKeyDefault: 'en', prefixDefault: false};
      assert.equal(addLangKeyToSlug(slug, langKey, options), '/about/');
    });
    it('should add the lang key in the slug when prefixDefault is true', () => {
      const slug = '/about/';
      const langKey = 'en';
      const options = {langKeyDefault: 'en', prefixDefault: true};
      assert.equal(addLangKeyToSlug(slug, langKey, options), '/en/about/');
    });
  });

  describe('getUrlForLang', () => {
    it('/ & en => /en/', () => {
      const url = '/';
      const lang = 'en';
      const home = `/${lang}/`;
      assert.equal(getUrlForLang(home, url, lang), '/en/');
    });
    it('/ & pt => /pt/', () => {
      const url = '/';
      const lang = 'pt';
      const home = `/${lang}/`;
      assert.equal(getUrlForLang(home, url, lang), '/pt/');
    });
    it('/en/ & en => /en/', () => {
      const url = '/en/';
      const lang = 'en';
      const home = `/${lang}/`;
      assert.equal(getUrlForLang(home, url, lang), '/en/');
    });
    it('/pt/ & en => /en/', () => {
      const url = '/pt/';
      const lang = 'en';
      const home = url;
      assert.equal(getUrlForLang(home, url, lang), '/en/');
    });
    it('/en/about/ & en => /en/about/', () => {
      const url = '/en/about/';
      const lang = 'en';
      const home = `/${lang}/`;
      assert.equal(getUrlForLang(home, url, lang), '/en/about/');
    });
    it('/pt/about/ & en => /en/about/', () => {
      const url = '/pt/about/';
      const lang = 'en';
      const home = `/pt/`;
      assert.equal(getUrlForLang(home, url, lang), '/en/about/');
    });
  });

  describe('getLangs', () => {
    it('/ & en', () => {
      const langs = getLangs(['en', 'fr', 'pt'], 'en', getUrlForLang('/en/', '/'));
      const expected = [
        {
          'langKey': 'en',
          'link': '/en/',
          'selected': true
        }, {
          'langKey': 'fr',
          'link': '/fr/',
          'selected': false
        }, {
          'langKey': 'pt',
          'link': '/pt/',
          'selected': false
        }];
      assert.deepEqual(langs, expected);
    });
  });

  describe('getI18nBase', () => {
    const en = {
      title: 'test'
    };
    const pt = {
      title: 'teste'
    };

    const getI18n = getI18nBase({
      en,
      pt
    });

    it('return pt for pt', () => {
      const i18n = getI18n('pt');
      assert.equal(i18n, pt);
    });
    it('return en for any', () => {
      const i18n = getI18n('any');
      assert.equal(i18n, en);
    });
  });

  describe('isHomePage', () => {
    it('/ true', () => {
      assert.ok(isHomePage('/'));
    });
    it('/en/ true', () => {
      assert.ok(isHomePage('/en/'));
    });
    it('/pt/ true', () => {
      assert.ok(isHomePage('/pt/'));
    });
    it('/en/tags/ false', () => {
      assert.notOk(isHomePage('/en/tags/'));
    });
  });
});

