export const tryNTimes = (mainFunction, attempts, msInterval = 100) => new Promise(
(resolve, reject) => {
  let attemptCounter = 0;

  const doAttempt = () => {
    attemptCounter += 1;

    mainFunction()
      .then(resolve)
      .catch((error) => {
        if (attemptCounter < attempts) {
          setTimeout(doAttempt, msInterval)
        } else {
          reject(error);
        };
      });
  };

  doAttempt();
});
