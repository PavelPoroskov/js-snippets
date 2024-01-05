// import { tryNTimes } from './promise-chain.mjs';
import { tryNTimes } from './use-setTimeout.mjs';

const ATTEMPTS = 4;

const makeFunctionWithCallResults = (returnArray) => {
  let callIndex = -1;

  return async () => {
    callIndex += 1;
    
    // return returnArray[callIndex];
    return returnArray[callIndex]();
    // return (() => returnArray[callIndex])();
  }
};

const testAllFailed = async () => {
  const fn = makeFunctionWithCallResults([
    Promise.reject(-1),
    Promise.reject(-2),
    Promise.reject(-3),
    Promise.reject(-4),
  ]);

  try {
    const result = await tryNTimes(fn, ATTEMPTS);
  } catch (err) {
    return err === -4;
  }

  return false;
}

const testAllSuccess = async () => {
  const fn = makeFunctionWithCallResults([
    1,
    2,
    3,
    4,
  ]);
  const result = await tryNTimes(fn, ATTEMPTS);

  return result === 1;
}

const testLastSuccess = async () => {
  const fn = makeFunctionWithCallResults([
    Promise.reject(-1),
    Promise.reject(-2),
    Promise.reject(-3),
    4,
  ]);
  const result = await tryNTimes(fn, ATTEMPTS);

  return result === 4;
}

// for test date
// [
//   Promise.reject(-1),
//   2,
//   Promise.reject(-33),
//   Promise.reject(-44),
// ]
// we have UnhandledPromiseRejectionWarning -33, UnhandledPromiseRejectionWarning -44
// for promise chain
// It is bad solution.
// Or.
// It is unrealistic test data. In real data we does not know result/rejection of next call
// if current call is successful.
//
// We have UnhandledPromiseRejectionWarning -2, UnhandledPromiseRejectionWarning -4
// for use-setTimeout
const testThirdSuccess = async () => {
  try {
    const fn = makeFunctionWithCallResults([
      // Promise.reject(-1),
      // Promise.reject(-2),
      // 3,
      // Promise.reject(-4),
      () => Promise.reject(-1),
      () => Promise.reject(-2),
      () => 3,
      () => Promise.reject(-4),
    ]);

    const result = await tryNTimes(fn, ATTEMPTS);

    return result === 3;
  } catch (err) {
    return false;
  }
}

const runAllTest = async () => {
  const allTest = [
    // testAllFailed,
    // testAllSuccess,
    // testLastSuccess,
    testThirdSuccess,
  ];

  for (const test of allTest) {
    const testResult = await (async () => {
      try {
        return await test();
      } catch (er) {
        return false;
      }
    })();

    if (testResult !== true) {
      console.log(`Test FAILED: ${test.name}`);

      return false;
    }
  };

  console.log(`SUCCESS`);

  return true;
}

runAllTest();