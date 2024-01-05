export const returnFirstSuccess = arrFunctions => arrFunctions.reduce(
  (promiseChain, currentFunction, index) => promiseChain.catch((err) => {
    console.log(`attempt ${index + 1}`, currentFunction);

    return currentFunction();
  }),
  Promise.reject(),
);

export const tryNTimes = (mainFunction, attempts) => returnFirstSuccess(
  new Array(attempts).fill(mainFunction),
);
