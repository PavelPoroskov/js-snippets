const deasync = require('deasync');

const requireESModule = (moduleNameOrPath) => {
  let isDone = false;
  let module;
  let error;

  import(moduleNameOrPath)
  .then((loadedModule) => {
    module = loadedModule;
    isDone = true;
  }).catch((err) => {
    error = err;
    isDone = true;
  });
  deasync.loopWhile(() => !isDone);

  if (error) {
    throw error;
  }

  return module;
};

module.exports = {
  requireESModule,
};
