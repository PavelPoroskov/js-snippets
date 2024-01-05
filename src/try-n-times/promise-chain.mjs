// generatePromisesSequence === throwFirstError
const generatePromisesSequence = (arr, input) => arr.reduce(
  (promiseChain, currentFunction) => promiseChain.then(currentFunction),
  Promise.resolve(input),
);

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

// sequencial execution of list of commands
// await renameCommand.reduce(
//   (promiseChain, command) => promiseChain.then(rename(command.from, command.to)),
//   Promise.resolve()
// )