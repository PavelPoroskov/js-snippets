const { Transform } = require('stream');

class BufferingStream extends Transform {
  constructor(MIN_OUTPUT_CHUNK_SIZE) {
    console.log('=== BufferingStream constructor');
    console.log(MIN_OUTPUT_CHUNK_SIZE);
    super();
    this.MIN_OUTPUT_CHUNK_SIZE = MIN_OUTPUT_CHUNK_SIZE;
    this.arChunks = [];
    this.totalSize = 0;
  }
  _transform(chunk, encoding, callback) {
    console.log(`  === call _transform ${chunk.length}`);
    this.arChunks.push(chunk);
    this.totalSize += chunk.length;
    if (this.totalSize >= this.MIN_OUTPUT_CHUNK_SIZE) {
      console.log(`  === transform size ${this.totalSize}`);
      this.push(Buffer.concat(this.arChunks));
      this.arChunks = [];
      this.totalSize = 0;
      callback();
    } else {
      console.log(`  === NOT transform size ${this.totalSize}`);
      callback();
    }
  }
  _final(callback) {
    console.log(`  === call _final`);
    if (this.totalSize) {
      console.log(`  === transform LAST ${this.totalSize}`);
      this.push(Buffer.concat(this.arChunks));
      this.arChunks = [];
      this.totalSize = 0;
    }
    callback();
  }
  _flush(callback) {
    console.log(`  === call _flush`);
    if (this.totalSize) {
      console.log(`  === transform LAST ${this.totalSize}`);
      this.push(Buffer.concat(this.arChunks));
      this.arChunks = [];
      this.totalSize = 0;
    }
    callback();
  }
}

module.exports = {
  BufferingStream,
}
