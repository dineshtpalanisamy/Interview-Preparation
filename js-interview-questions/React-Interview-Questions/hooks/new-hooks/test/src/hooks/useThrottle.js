// create a useThrottle() hook in React with the leading and trailing flag.

// When leading is enabled the first function will invoke right away and then after the specified delay, while when trailing is enabled the first function will invoke after the delay and so on.

// We will be using useRef() to track the timerId of setTimeout so that we can reset it as an when required and previous arguments.

// Also, we will wrap the logic inside the useCallback() to avoid needless re-renderings as the callback function returns a memoized function that only change when one of the dependency changes.

import { useCallback, useRef } from "react";

const useThrottle = (fn, wait, option = { leading: true, trailing: true }) => {
  const timerId = useRef(); // track the timer
  const lastArgs = useRef(); // track the args

  // create a memoized debounce
  const throttle = useCallback(
    function (...args) {
      const { trailing, leading } = option;
      // function for delayed call
      const waitFunc = () => {
        // if trailing invoke the function and start the timer again
        if (trailing && lastArgs.current) {
          fn.apply(this, lastArgs.current);
          lastArgs.current = null;
          timerId.current = setTimeout(waitFunc, wait);
        } else {
          // else reset the timer
          timerId.current = null;
        }
      };

      // if leading run it right away
      if (!timerId.current && leading) {
        fn.apply(this, args);
      }
      // else store the args
      else {
        lastArgs.current = args;
      }

      // run the delayed call
      if (!timerId.current) {
        timerId.current = setTimeout(waitFunc, wait);
      }
    },
    [fn, wait, option]
  );

  return throttle;
};

export { useThrottle };
