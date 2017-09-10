import {
  createPages,
  onCreateNode,
  onCreatePage
} from './gatsby-node';
import { ok } from 'ptz-assert';

describe('gatsby-node', () => {
  it('exports createPages', () => {
    ok(createPages);
  });
  it('exports onCreateNode', () => {
    ok(onCreateNode);
  });
  it('exports onCreatePage', () => {
    ok(onCreatePage);
  });
});
