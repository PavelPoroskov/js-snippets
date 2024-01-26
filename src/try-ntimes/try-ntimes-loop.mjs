const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms));

// TODO makeTryNTimes = (mainFunction) => (...arguments) => {...};

export const tryNTimes = async (mainFunction, attempts=1, msDelay=0) => {
  let result;
  let isSuccess = false;
  let nTry = 1;

  while (!isSuccess && nTry < attempts) {
    try {
      // eslint-disable-next-line no-await-in-loop
      result = await mainFunction();
      isSuccess = true;
    } catch (err) {
      if (msDelay > 0) {
        // eslint-disable-next-line no-await-in-loop
        await wait(msDelay);
      }
      nTry += 1;
    }
  }

  if (!isSuccess) {
    result = await mainFunction();
  }

  return result;
}