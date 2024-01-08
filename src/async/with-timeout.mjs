export const withTimeout = ({ promise, msTimeoutLimit, timeoutErrorMessage }) => {
  if (!msTimeoutLimit) {
    return promise;
  }

  let timeoutId;
  const timerPromise = new Promise((resolve) => {
    timeoutId = setTimeout(resolve, msTimeoutLimit, { timeout: true });
  });

  return Promise.race([
    promise,
    timerPromise,
  ]).then((response) => {
    if (response?.timeout) {
      throw new Error(timeoutErrorMessage || `withTimeout(): timeout limit ${msTimeoutLimit}`);
    }

    clearTimeout(timeoutId);

    return response;
  });
};

