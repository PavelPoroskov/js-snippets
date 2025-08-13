import assert from 'node:assert/strict';
import test from 'node:test';
import { Worker } from 'node:worker_threads';

// TODO find effective (time, memory) way to pass binary data (image) to worker
//  using base64 string
//  using array
//  using other structure: File, Blob, Stream

test('worker: input binary, output binary', async() => {
  const runWorker = (input) => new Promise((fnResolve) => {
    const worker = new Worker(new URL('binary.worker.mjs', import.meta.url));
    worker.on('message', (result) => {
      fnResolve(result);
      console.log(' ### after fnResolve(result)');
      worker.terminate();
      console.log(' ### after worker.terminate()');
    })
    worker.on('error', (err) => {
      console.log(' ### ERROR in worker', err);
      worker.terminate();
    });
    worker.postMessage(input, [input.buffer]);
  });

  const testString = 'Test string';
  const buffer = Buffer.from(testString, 'utf8');

  // const ab = new ArrayBuffer(buffer.buffer)
  // console.log('ab byteLength', ab.byteLength) // 0
  // const input = new Uint8Array(ab)
  // console.log('input length', input.length) // 0

  const ab = new ArrayBuffer(testString.length)
  console.log('ab byteLength', ab.byteLength)
  const input = new Uint8Array(ab)
  input.set(testString)
  console.log('input length', input.length)

  const output = await runWorker(input) 
  .catch((err) => {
    console.log('Error in', err)
  });

  const buffer2 = Buffer.from(testString, 'utf8');
  const expectedOutput = new Uint8Array(buffer2.buffer)

  // console.log('typeof output', typeof output) // object
  // console.log('output.__proto__', output.__proto__) // TypedArray {}
  // console.log('output.constructor.prototype', output.constructor.prototype) // TypedArray {}
  // console.log('output.constructor.__proto__', output.constructor.__proto__) // [Function: TypedArray]
  // console.log('output.constructor', output.constructor) // [Function: Uint8Array]
  // console.log('output.constructor.name', output.constructor.name) // Uint8Array

  assert.deepEqual(
    output,
    expectedOutput,
  );
});

