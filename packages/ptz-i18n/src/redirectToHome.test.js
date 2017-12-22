import { redirectToHome } from './index';

describe('redirectToHome', () => {
  it('redirect', () => {
    const langs = ['en', 'pt', 'fr'];
    const defaultLangKey = 'en';

    window.location.replace = jest.fn(); // mock

    redirectToHome(langs, defaultLangKey);

    expect(window.location.replace).toBeCalledWith('/en/');
  });
});
