// Let us see how to create useResponsive() hook in React that will return the device type (isMobile, isTablet, isDesktop) depending upon the window width.

// Many times we require to conditionally render components depending upon the device, rather than hiding and showing through CSS we can use this hook.

// For this, we will assign an event listener to the window object and listen to the resize event on the function onResizeHandler() that will update the state when ever user resizes the screen.

// Assigning the event listener and removing it are abstracted inside two functions Setup() and Cleanup() and it is called inside the useEffect() hook, we have also called onResizeHandler() to initialize the value.

import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

const useResponsive = () => {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    onResizeHandler();

    addResponsiveEventhandler();
    return () => {
      removeRespEventHandler();
    };
  }, []);
  // debounce the resize call
  // update the state on window resize
  const onResizeHandler = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990;
    const isDesktop = window.innerWidth > 990;

    setState({ isMobile, isTablet, isDesktop });
  };
  const debouncedCall = useDebounce(onResizeHandler, 500);
  const addResponsiveEventhandler = () =>
    window.addEventListener("resize", debouncedCall, false);

  const removeRespEventHandler = () =>
    window.removeEventListener("resize", debouncedCall, false);

  return state;
};

export { useResponsive };
