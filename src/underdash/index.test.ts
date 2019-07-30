import { isEmptyObject, wrapModulo } from './index';

describe('underdash isEmptyObject', (): void => {
  it('recognizes empty object', (): void => {
    const isEmpty = isEmptyObject({});
    expect(isEmpty).toBe(true);
  });

  it('dismisses non empty object', (): void => {
    const isEmpty = isEmptyObject({ null: null });
    expect(isEmpty).toBe(false);
  });
});

describe('underdash wrapModulo', (): void => {
  it('wraps around positive limit', (): void => {
    const result = wrapModulo(5, 4);
    expect(result).toBe(1);
  });

  it('wraps around negative limit', (): void => {
    const result = wrapModulo(-1, 4);
    expect(result).toBe(3);
  });
});
