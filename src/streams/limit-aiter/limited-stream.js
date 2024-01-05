const { Transform } = require('stream');

const LIMIT_ERROR = 'limit was exceeded';

class LimitedStream extends Transform {
  constructor(limit) {
    console.log('=== LimitedStream constructor');
    console.log(limit);
    super(limit);
    this.LIMIT = limit;
    this.totalLength = 0;
  }
  _transform(chunk, encoding, callback) {
    console.log(`=== transform ${chunk.length}`);
    this.totalLength += chunk.length;
    if (this.totalLength <= this.LIMIT) {
      console.log('  === transform IF');
      this.push(chunk);
      callback();
    } else {
      console.log('  === transform ELSE');
      // throw new Error(LIMIT_ERROR);
      callback(new Error(LIMIT_ERROR));
    }
  }
}

module.exports = {
  LimitedStream,
}
