// Promise.all with no-promise

const wait = ms => new Promise( fnResolve => setTimeout(fnResolve, ms) );
const waitWithLog = async (ms, message) => {
  await wait(ms);
  console.log(`Async ${message}, after ${ms} ms`);
}

const fnNotPromise = (forLimit, message) => {

  let acc = 1;
  let dd = 0;
  for (let i=0; i < forLimit; i+=1) {
    dd = i;
    acc = dd + 2;
  };
  console.log(`NoAsync ${message}, after ${forLimit} iteration`);
}

const test = async () => {
  let needTask100 = true;

  // console.log();
  // console.log('test 1: begin');
  // await Promise.all([
  //   needTask100 && waitWithLog(200, 'task 1'),
  //   waitWithLog(400, 'task 2'),
  // ])
  // console.log('test 1: end');

  // console.log();
  // console.log('test 2: begin');
  // needTask100 = false;
  // await Promise.all([
  //   needTask100 && waitWithLog(200, 'task 1'),
  //   waitWithLog(400, 'task 2'),
  // ])
  // console.log('test 2: end');

  // console.log();
  // console.log('test 3: begin');
  // await Promise.all([
  //   waitWithLog(50, 'task 1'),
  //   fnNotPromise(10000000000, 'task 2'),
  // ])
  // console.log('test 3: end');
  // result
  // fnNotPromise(10000000000) finished first and last more than 50 ms
  // no promised fnNotPromise(10000000000) blocks waitWithLog(50, 'task 1')

  // console.log();
  // console.log('test 4: begin');
  // await Promise.all([
  //   fnNotPromise(1000000, 'task 1'),
  //   fnNotPromise(2000000, 'task 2'),
  // ])
  // console.log('test 4: end');

  console.log();
  console.log('test 5: begin');
  let pall = Promise.all([
    fnNotPromise(1000000000, 'task 1'),
    fnNotPromise(2000000000, 'task 2'),
  ])
  console.log('test 5: end');
  console.log(pall);
  setTimeout(function() {
    console.log('the stack is now empty');
    console.log(pall);
  });
  // fnNotPromise() blocks all
};

test();