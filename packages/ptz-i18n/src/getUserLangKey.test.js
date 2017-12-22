import { getUserLangKey } from './index';
import * as assert from 'ptz-assert';

describe('getUserLangKey', () => {
  it('return en', () => {
    const langs = ['en', 'pt', 'fr'];
    const defaultLangKey = 'en';

    const langKey = getUserLangKey(langs, defaultLangKey);

    assert.equal(langKey, 'en');
  });

  it('return pt', () => {
    const langs = ['pt', 'fr'];
    const defaultLangKey = 'pt';

    const langKey = getUserLangKey(langs, defaultLangKey);

    assert.equal(langKey, 'pt');
  });
});
