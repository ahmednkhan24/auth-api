import has from 'lodash/has';

/*
 * returns true if all keys are properties within the obj object
 * returns false on first key not found within the obj object
 */
export const hasAllKeys = (obj: object, keys: string[]) =>
  keys.every((key) => has(obj, key));
