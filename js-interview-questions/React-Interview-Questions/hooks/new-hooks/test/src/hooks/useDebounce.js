import { useRef, useCallback } from "react";

const useDebounce = (fn, delay) => {
  // useCallBack important becoz even if the rendering happens state remain intact in usedebounce
  let timeout = useRef(null); //returns object holds the key => current which holds the value
  let debounce = useCallback(
    function () {
      let context = this;
      let args = arguments;
      clearTimeout(timeout.current);
      timeout.current = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    },
    [fn, delay]
  );
  return debounce;
};

export { useDebounce };
