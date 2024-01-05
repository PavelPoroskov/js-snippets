const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const fs = require('fs');
const path = require('path');

const removeFile = util.promisify(fs.unlink);

async function pipeWithLimitAsyncIter(readable, writable, limit) {
  await pipeline(
    readable,
    async function* (source) {
      let totalLength = 0;
      for await (const chunk of source) {
        totalLength += chunk.length;
        if (totalLength <= limit) {
          yield chunk;
        } else {
          throw new Error('limit was exceeded');
        }
      }
    },
    writable
  );
  console.log('Pipeline succeeded.');
}

const test = async (limit) => {
  console.log();
  console.log(`Test with limit ${limit}`);
  const readable = stream.Readable.from(['12345', '67890', '33333']);

  const pathFile = path.join(__dirname, `test-write-stream-limit-aiter-${limit}.txt`);

  try {
    const writable = fs.createWriteStream(pathFile);
    await pipeWithLimitAsyncIter(readable, writable, limit);
    console.log(`pipe finished: ${pathFile}`);
  } catch (err) {
    console.log('caught error');
    console.log(err);
    if (err.message === 'limit was exceeded') {
      // await removeFile(pathFile);
      console.log('start to remove unfinished destination file');
      fs.unlink(pathFile, (err) => {
        if (err) {
          console.log('failed to remove unfinished destination file')
        } else {
          console.log('successful to remove unfinished destination file')
        }
      });
    }
  }
}

const testAll = async () => {
  await test(10);

};

testAll();