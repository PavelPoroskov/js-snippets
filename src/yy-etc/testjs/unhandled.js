const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms, ms) );

const throwAfter = (ms, message=`throw after ${ms}`) => wait(ms).then(() => {
  throw message
});
const rejectAfter = (ms) => new Promise(
  (fnResolve, fnReject) => setTimeout(fnReject, ms, `reject after ${ms}`),
);
const messageAfter = (ms, message=`message after ${ms}`) => wait(ms).then(() => {
  console.log(message);
});

const test1 = async () => {
  try {
    const waitPromise = wait(100)
    .then(() => {
      throw 'Error from promise';
    });

    throw 'Error before await';

    await Promise.all([
      wait(200),
      waitPromise,
    ]);
    throw 'Error after await';
  } catch (caughtError) {
    console.log(' === caughtError ', caughtError);
  }
}

const test2 = async () => {
  try {
    await Promise.all([
      messageAfter(400),
      messageAfter(200).then((result) => Promise.all([
        messageAfter(100),
        messageAfter(50),
      ])),
    ]);
  } catch (caughtError) {
    console.log(' === caughtError ', caughtError);
  }
}

const testNotAwaitPromiseBefore = async () => {
  try {
    // // unhandled
    // const waitPromise = rejectAfter(100);
    // // unhandled
    // const waitPromise = rejectAfter(300);
    // // unhandled
    // const waitPromise = rejectAfter(300).catch((err) => { throw err; });
    // // ignored
    const waitPromise = rejectAfter(300).catch((err) => {});

    await wait(200);
    console.log(' === after wait(200)');
  } catch (caughtError) {
    console.log(' === caughtError ', caughtError);
  }
}

const testAwaitPromiseBefore = async () => {
  try {
    // handled
    const waitPromise = rejectAfter(200);
    await wait(100);
    await waitPromise;

    // unhandled, caught
    // const waitPromise = rejectAfter(200);
    // await wait(300);
    // await waitPromise;

    // handled
    // await rejectAfter(200);
  } catch (caughtError) {
    console.log(' === caughtError ', caughtError);
  }
}

testAwaitPromiseBefore();