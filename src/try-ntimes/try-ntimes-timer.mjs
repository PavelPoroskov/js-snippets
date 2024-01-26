export const tryNTimes = (mainFunction, attempts=1, msDelay=0) => new Promise(
  (fnResolve, fnReject) => {
    let attemptCounter = 0;
  
    const doAttempt = () => {
      attemptCounter += 1;
  
      mainFunction()
        .then(fnResolve)
        .catch((error) => {
          if (attemptCounter < attempts) {
            setTimeout(doAttempt, msDelay)
          } else {
            fnReject(error);
          }
        });
    };
  
    doAttempt();
  });
  