import { getBrowserLanguage } from './index';
import * as assert from 'ptz-assert';

describe('getBrowserLanguage', () => {
  it('return lang key', () => {
    const langKey = getBrowserLanguage();
    assert.ok(langKey);
  });
});
