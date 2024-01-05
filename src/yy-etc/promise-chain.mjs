// generatePromisesSequence === throwFirstError
const generatePromisesSequence = (arr, input) => arr.reduce(
  (promiseChain, currentFunction) => promiseChain.then(currentFunction),
  Promise.resolve(input),
);


// sequencial execution of list of commands
// await renameCommand.reduce(
//   (promiseChain, command) => promiseChain.then(rename(command.from, command.to)),
//   Promise.resolve()
// )