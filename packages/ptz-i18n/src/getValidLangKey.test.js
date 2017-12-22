import { getValidLangKey } from './index';

describe('getValidLangKey', () => {
  it('return default when null langKey', () => {
    const defaultLang = 'en';
    const langs = ['en', 'fr', 'pt'];

    const langKey = getValidLangKey(langs, defaultLang, null);
    
    expect(langKey).toBe('en');
  });
});
