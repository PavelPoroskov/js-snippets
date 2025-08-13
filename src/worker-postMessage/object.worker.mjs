import { parentPort } from 'node:worker_threads';

parentPort.on('message', (input) => {
  const { str: inString, tarr: inArray } = input

  const changedString = inString + inString.length

  const changedArray = new Uint8Array(inArray.length + 1)
  changedArray.set(inArray, 0);
  changedArray.set([inArray.length], inArray.length);

  parentPort.postMessage({
    str: changedString,
    tarr: changedArray,
  });
});