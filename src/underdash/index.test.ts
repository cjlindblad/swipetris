import { isEmptyObject, wrapModulo } from './index';

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

describe('underdash wrapModulo', () => {
  it('wraps around positive limit', () => {
    const result = wrapModulo(5, 4);
    expect(result).toBe(1);
  });

  it('wraps around negative limit', () => {
    const result = wrapModulo(-1, 4);
    expect(result).toBe(3);
  });
});
