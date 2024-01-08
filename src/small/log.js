import { inspect } from 'node:util';

export const logObject = (obj) => {
  inspect(obj, { showHidden: false, depth: null });
};