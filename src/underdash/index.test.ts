import { isEmptyObject } from './index';

describe('underdash isEmptyObject', () => {
  it('recognizes empty object', () => {
    const isEmpty = isEmptyObject({});
    expect(isEmpty).toBe(true);
  });

  it('dismisses non empty object', () => {
    const isEmpty = isEmptyObject({ null: null });
    expect(isEmpty).toBe(false);
  });
});
