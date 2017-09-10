import {createPages} from './createPages';
import {ok} from 'ptz-assert';

describe('createPages', () => {
  it('return Promise', () => {
    const graphql = () => null;
    const boundActionCreators = {
      createPage: () => null
    };
    const pluginOptions = {

    };

    const result = createPages({ graphql, boundActionCreators }, pluginOptions);
    ok(result);
  });
});
