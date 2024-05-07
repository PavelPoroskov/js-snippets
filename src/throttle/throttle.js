function throttle0(func, delay) {
  let timeout = null
  
  return () => {
    if (!timeout) {
      func()
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
    }
  }
}

// https://codedamn.com/news/javascript/throttling-in-javascript

function throttle1(func, delay) {
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

// delay=300, 
// throttle: guarantee interval between calls from [t0 t100 t200 t250 t310] t700 => t0, t250 at t300, t310 at t600, t700 at t900
function throttle(func, pausedDelayMs) {
  let isPause = false;
  let duringPauseArgs = null;

  function endPause() {
    isPause = false;

    if (duringPauseArgs) {
      func(...duringPauseArgs);
      duringPauseArgs = null;
      isPause = true;
      setTimeout(endPause, pausedDelayMs);
    }
  }

  return (...args) => {
    if (!isPause) {
      func(...args);
      isPause = true;
      setTimeout(endPause, pausedDelayMs);
    } else {
      // attempt to call during the pause
      duringPauseArgs = args;
    }
  }
}