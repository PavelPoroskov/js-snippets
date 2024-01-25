import assert from 'node:assert/strict';
import test from 'node:test';

import os from 'node:os';
import WorkerPool from './worker-pool.mjs';

test('worker-pool', async() => {
  const runTasks = (taskList) => new Promise((fnResolve) => {
    const pool = new WorkerPool({
      workerPath: new URL('sum.worker.mjs', import.meta.url),
      numThreads: os.availableParallelism()
    });

    let nFinishedTasks = 0;
    const results = {};
  
    for (let iTask = 0; iTask < taskList.length; iTask += 1) {
      pool.runTask(taskList[iTask], (err, result) => {
        results[iTask] = { task: taskList[iTask], result };
    
        nFinishedTasks += 1;
    
        if (nFinishedTasks === taskList.length) {
          pool.close();
          fnResolve(results);
        }
      });
    }
   });

  const results = await runTasks([
    { a: 100, b: 0 },
    { a: 100, b: 1 },
    { a: 100, b: 2 },
    { a: 100, b: 3 },
    { a: 100, b: 4 },
    { a: 100, b: 5 },
    { a: 100, b: 6 },
    { a: 100, b: 7 },
    { a: 100, b: 8 },
    { a: 100, b: 9 },
  ]);

  assert.deepEqual(
    results,
    {
      0: { task: { a: 100, b: 0 }, result: 100 },
      1: { task: { a: 100, b: 1 }, result: 101 },
      2: { task: { a: 100, b: 2 }, result: 102 },
      3: { task: { a: 100, b: 3 }, result: 103 },
      4: { task: { a: 100, b: 4 }, result: 104 },
      5: { task: { a: 100, b: 5 }, result: 105 },
      6: { task: { a: 100, b: 6 }, result: 106 },
      7: { task: { a: 100, b: 7 }, result: 107 },
      8: { task: { a: 100, b: 8 }, result: 108 },
      9: { task: { a: 100, b: 9 }, result: 109 },
    },
  );
});

