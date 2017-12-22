import { isInPagesPaths } from './';
import * as assert from 'ptz-assert';

describe('isInPagesPaths', () => {
  it('return true for /src/pages/index.js in [/src/pages/]', () => {
    const options = {
      pagesPaths: ['/src/pages/']
    };
    const isIn = isInPagesPaths(options, '/src/pages/index.js').merge();
    
    assert.equal(isIn, true);
  });

  it('return false for /src/pages/index.js in [/what/ever/]', () => {
    const options = {
      pagesPaths: ['/what/ever/']
    };
    const isIn = isInPagesPaths(options, '/src/pages/index.js').merge();
    
    assert.equal(isIn, false);
  });
  
  it('return error for null options', () => {
    const options = null;
    const isIn = isInPagesPaths(options, '/src/pages/index.js').merge();
    
    assert.equal(isIn, 'Null plugin options');
  });

  it('return error for null pagesPaths', () => {
    const options = {
      pagesPaths: null
    };
    const isIn = isInPagesPaths(options, '/src/pages/index.js').merge();
    
    assert.equal(isIn, 'Null pluginOptions.pagesPaths');
  });
});

