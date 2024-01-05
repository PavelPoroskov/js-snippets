const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');


const limit = 10;
// const limit = 11;
// const limit = 15;

const pipeWithLimit = (readable, writable, LIMIT) => new Promise((resolve, reject) => {

  let totalLength = 0;
  readable.on('readable', function() {
    // There is some data to read now.
    let data;
  
    while (data = this.read(7)) {
      console.log('on readable');
      console.log(data);
      totalLength += data.length;
      if (totalLength > LIMIT) {
        // reject(`limit (${LIMIT}) was exceeded`);

        // readable.unpipe();

        readable.destroy(`limit (${LIMIT}) was exceeded`);
        // cause readable on error
      }
    }
  });
  // readable.on('data', chunk => {
  //   console.log('on data');
  //   console.log(chunk);
  //   totalLength += chunk.length;
  //   if (totalLength > LIMIT) {
  //     // reject(`limit (${LIMIT}) was exceeded`);

  //     // readable.unpipe();

  //     readable.destroy(`limit (${LIMIT}) was exceeded`);
  //     // cause readable on error
  //   }
  //   console.log(chunk.length);
  // });
  readable.on('error', err => {
    console.log('readable error');
    reject(err)
  });

  writable.on('error', err => reject(err));
  writable.on('finish', resolve);

  readable.pipe(writable);
})

const test = async (limit) => {
  console.log();
  console.log(`Test with limit ${limit}`);
  const readable = Readable.from(['12345', '67890', '33333']);

  const pathFile = path.join(__dirname, `test-write-stream-limit-${limit}.txt`);

  try {
    const writable = fs.createWriteStream(pathFile);
    await pipeWithLimit(readable, writable, limit);
    console.log(`pipe finished: ${pathFile}`);
  } catch (err) {
    console.log('caught error');
    console.log(err);
    // if delete file 
  }
}

const testAll = async () => {
  await test(10);

};

testAll();