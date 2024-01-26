export const returnFirstSuccess = arrFunctions => arrFunctions.reduce(
  (promiseChain, currentFunction) => promiseChain.catch(() => {
    return currentFunction();
  }),
  Promise.reject(),
);

const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms));

export const tryNTimes = (mainFunction, attempts=1, msDelay=0) => {
  const fnArray = new Array(attempts).fill(
    (msDelay > 0
      ? () => wait(msDelay).then(mainFunction)
      : () => mainFunction()
    )
  );
  fnArray[0] = mainFunction;

  return returnFirstSuccess(fnArray)
};
