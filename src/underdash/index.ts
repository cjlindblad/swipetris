// some util functions
export const isEmptyObject = (obj: Object) =>
  Object.entries(obj).length === 0 && obj.constructor === Object;
