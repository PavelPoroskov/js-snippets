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
  

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry utility with exponential backoff
function retry(fn, retries = 3, delay = 1000) {
    return fn().catch(error => {
        if (retries > 0) {
            console.log(`Retrying... ${retries} attempts left`);
            return timeout(delay).then(() => retry(fn, retries - 1, delay * 2));
        }
        throw error;
    });
}  