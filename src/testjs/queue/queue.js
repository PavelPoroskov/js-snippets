const asyncApi = require('async');

const wait = ms => new Promise( fnResolve => setTimeout(fnResolve, ms) );

const worker = async ({ name, ms, error }) => {
  console.log('> started: ', name );

  if (error) {
    throw new Error(error);
  }

  await wait(ms);
  console.log('< finished: ', name );
};

const test = async () => {
  const queue = asyncApi.queue( worker, 1);
  queue.error(function(err, task) {
    // console.error('task experienced an error', err);
    queue.kill();
    throw err;
  });
  queue.drain(function() {
    console.log('all items have been processed');
  });

  queue.push({ name: 'task 1', ms: 500 });
  queue.push({ name: 'task 2', ms: 500 });

  await wait(4000);

  // queue.push({ name: 'task 3', ms: 600 });
  queue.push({ name: 'task 3', ms: 600, error: 'Dread' });
  queue.push({ name: 'task 4', ms: 300 });
};

test();