import { onCreatePage } from './onCreatePage';
import { notOk } from 'ptz-assert';

describe('onCreatePage', () => {
  it('return null if page.context.slug is not empty', () => {
    const page = {
      context: {
        slug: '/en/test/'
      },
      componentPath: '/angeloocana/pages/test.en.js'
    };

    const result = onCreatePage({ page });

    notOk(result);
  });

  it('return null if page.componentPath not contains folder pages', () => {
    const page = {
      context: {
        slug: '/en/test/'
      },
      componentPath: '/angeloocana/test.en.js'
    };

    const result = onCreatePage({ page });

    notOk(result);
  });
});
