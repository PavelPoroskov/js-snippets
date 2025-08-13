import { parentPort } from 'node:worker_threads';

parentPort.on('message', (inString) => {
  const changedString = inString + inString.length
  parentPort.postMessage(changedString);
});