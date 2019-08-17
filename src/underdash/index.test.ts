import { isEmptyObject, wrapModulo, lineWrap, expandString } from './index';

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

describe('underdash lineWrap', () => {
  it('breaks a long string into multiple lines of equal length', () => {
    const string = 'this string is a bit too long';
    const result = lineWrap(string, 10);
    const expectedResult = 'this      \nstring is \na bit too \nlong      ';
    expect(result).toEqual(expectedResult);
  });

  it('keeps words with same width as limit', () => {
    const string = 'lorem ipsum lorem ipsum';
    const result = lineWrap(string, 5);
    const expectedResult = 'lorem\nipsum\nlorem\nipsum';
    expect(result).toEqual(expectedResult);
  });

  it('handles words longer than limit', () => {
    const string = 'one gargantually long word';
    const result = lineWrap(string, 4);
    const expectedResult = 'one \ngar-\ngan-\ntua-\nlly \nlong\nword';
    expect(result).toEqual(expectedResult);
  });
});

describe('underdash expandString', () => {
  it('expands horizontally', () => {
    const string = '*';
    const result = expandString(string, 5, 1);
    const expectedResult = '*****';
    expect(result).toEqual(expectedResult);
  });

  it('expands vertically', () => {
    const string = '*';
    const result = expandString(string, 1, 5);
    const expectedResult = '*\n*\n*\n*\n*';
    expect(result).toEqual(expectedResult);
  });

  it('expands in two dimensions', () => {
    const string = '*';
    const result = expandString(string, 5, 5);
    const expectedResult = '*****\n*****\n*****\n*****\n*****';
    expect(result).toEqual(expectedResult);
  });
});
