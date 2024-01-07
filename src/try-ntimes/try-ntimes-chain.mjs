export const returnFirstSuccess = arrFunctions => arrFunctions.reduce(
  (promiseChain, currentFunction, index) => promiseChain.catch((err) => {
    // console.log(`attempt ${index + 1}`, currentFunction);

    return currentFunction();
  }),
  Promise.reject(),
);

const wait = ms => new Promise(fnResolve => setTimeout(fnResolve, ms));

export const tryNTimes = (mainFunction, attempts=1, msDelay=0) => {
  const fnArray = new Array(attempts).fill(
    () => wait(msDelay).then(mainFunction)
  );
  fnArray[0] = mainFunction;

  return returnFirstSuccess(fnArray)
};
