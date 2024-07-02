import { useState, useEffect } from "react";

function useOnScreenBygetBoundingClientRect(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  // determine if the element is visible
  const observer = function () {
    const offset = 50;
    const top = ref.current.getBoundingClientRect().top;
    setIntersecting(top + offset >= 0 && top - offset <= window.innerHeight);
  };

  useEffect(() => {
    // first check
    observer();

    // assign the listener
    window.addEventListener("scroll", observer);

    // remove the listener
    return () => {
      window.removeEventListener("scroll", observer);
    };
  }, []);

  return isIntersecting;
}

export { useOnScreenBygetBoundingClientRect };
