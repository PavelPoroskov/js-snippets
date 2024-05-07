// debounce:  run last call from close in time calls [t0 t100 t200 t250 t310] t700 => t310 at t610, t700 at t1000
function debounce(func, timeout = 300){
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        func.apply(this, args);
      },
      timeout,
    );
  };
}

// debounce_leading:  run first call from close in time calls [t0 t100 t200 t250 t310] t700 => t0 at t0, t700 at t700
function debounce_leading(func, timeout = 300){
  let timer;

  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        timer = undefined;
      },
      timeout,
    );
  };
}