// https://codedamn.com/news/javascript/throttling-in-javascript

function throttle(func, delay) {
  let wait = false;

  return (...args) => {
    if (wait) {
      return;
    }

    func(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  }
}

function throttle2(func, delay) {
  let wait = false;
  let storedArgs = null;

  function checkStoredArgs () {
    if (storedArgs == null) {
      wait = false;
    } else {
      func(...storedArgs);
      storedArgs = null;
      // ?? why not wait = false; because after call we have pause (wait = true)
      setTimeout(checkStoredArgs, delay);
    }
  }

  return (...args) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    // if !wait
    func(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  }
}