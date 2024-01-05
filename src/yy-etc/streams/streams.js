const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const ws = fs.createWriteStream(path.join(__dirname, 'test-write-stream.txt'));
// console.log(ws);
ws.on('finish', () => {
  console.log('finish');
  // resolve(true);
});
ws.on('error', error => {
  console.log('error');
  // reject(error);
});
ws.on('end', () => {
  console.log('end');
  // resolve(true);
});
// ws.on('data', () => {
//   console.log('on data');
// });
ws.on('open', () => {
  console.log('open');
});
ws.on('ready', () => {
  console.log('ready');
});
ws.on('close', () => {
  console.log('close');
  // resolve(true);
});

const readable = new Readable();
readable._read = () => {}; // _read is required but you can noop it

readable.pipe(ws);

readable.push(Buffer.from('Test Read Stream string'));
readable.push(null);

