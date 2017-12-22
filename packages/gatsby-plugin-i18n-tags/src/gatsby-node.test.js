import * as Api from './gatsby-node';
import {deepEqual} from 'ptz-assert';

describe('gatsby-node', () => {
  it('export only known functions', () => {
    const fns = ['createPages', 'onCreateNode'];
    deepEqual(Object.keys(Api), fns);
  });
});
