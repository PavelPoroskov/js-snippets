import { Transform } from 'node:stream';
import { LimitWasExceededError } from './LimitWasExceededError.mjs';

export class CheckLimitStream extends Transform {
  constructor(limit) {
    super(limit);
    this.LIMIT = limit;
    this.totalLength = 0;
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(chunk, encoding, callback) {
    this.totalLength += chunk.length;
    
    if (this.totalLength <= this.LIMIT) {
      this.push(chunk);
      callback();
    } else {
      callback(new LimitWasExceededError(`Limit ${this.LIMIT} was exceeded`));
    }
  }
}
