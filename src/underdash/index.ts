// some util functions

// eslint-disable-next-line @typescript-eslint/ban-types
export const isEmptyObject = (obj: Object): boolean =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

export const wrapModulo = (x: number, n: number): number => ((x % n) + n) % n;
