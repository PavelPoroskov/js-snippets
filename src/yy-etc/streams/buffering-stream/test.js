const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const fs = require('fs');
const path = require('path');

const { BufferingStream } = require('./buffering-stream');

const removeFile = util.promisify(fs.unlink);

async function pipeWithLimitAsyncIter(readable, writable, minChunkSize) {
  const bufferingStream = new BufferingStream(minChunkSize);
  bufferingStream.on('data', data => {
    console.log(`= buffering output ${data} size ${data.length}`);
  });
  await pipeline(
    readable,
    bufferingStream,
    writable
  );
  console.log('Pipeline succeeded.');
}

const test = async (minChunkSize) => {
  console.log();
  console.log(`Test with buffer ${minChunkSize}`);
  const readable = stream.Readable.from(['[A]', '(B)', ':44:', '-12345678-', '*00000 00000 00000*', 'AAAAA']);

  const pathFile = path.join(__dirname, `test-write-${minChunkSize}.txt`);

  try {
    const writable = fs.createWriteStream(pathFile);
    await pipeWithLimitAsyncIter(readable, writable, minChunkSize);
    console.log(`pipe finished: ${pathFile}`);
  } catch (err) {
    console.log('caught error');
    console.log(err);
  }
}

const testAll = async () => {
  await test(10);

};

testAll();