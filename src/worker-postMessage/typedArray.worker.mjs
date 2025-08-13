import { parentPort } from 'node:worker_threads';

parentPort.on('message', (inArray) => {
  const changedArray = new Uint8Array(inArray.length + 1)
  changedArray.set(inArray, 0);
  changedArray.set([inArray.length], inArray.length);
  parentPort.postMessage(changedArray);
});