import { getCurrentLangKey } from './index';
import * as assert from 'ptz-assert';

describe('getCurrentLangKey', () => {
  it('/ & en => en', () => {
    const url = '/';
    const defaultLang = 'en';
    const langs = ['en', 'fr', 'pt'];

    const langKey = getCurrentLangKey(langs, defaultLang, url);

    assert.equal(langKey, 'en');
  });
  
  it('/ & pt => pt', () => {
    const url = '/';
    const defaultLang = 'pt';
    const langs = ['en', 'fr', 'pt'];

    const langKey = getCurrentLangKey(langs, defaultLang, url);

    assert.equal(langKey, 'pt');
  });

  it('/pt/ & en => pt', () => {
    const url = '/pt/';
    const defaultLang = 'en';
    const langs = ['en', 'fr', 'pt'];

    const langKey = getCurrentLangKey(langs, defaultLang, url);

    assert.equal(langKey, 'pt');
  });

  it('/en/about/ & en => en', () => {
    const url = '/en/about/';
    const defaultLang = 'en';
    const langs = ['en', 'fr', 'pt'];

    const langKey = getCurrentLangKey(langs, defaultLang, url);

    assert.equal(langKey, 'en');
  });

  it('/pt/about/ & en => pt', () => {
    const url = '/pt/about/';
    const defaultLang = 'en';
    const langs = ['en', 'fr', 'pt'];

    const langKey = getCurrentLangKey(langs, defaultLang, url);

    assert.equal(langKey, 'pt');
  });
});
