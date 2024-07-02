import { useRef } from "react";
import { useOnScreenIntersectionObserver } from "../hooks/useOnScreenHookByIntersectionObserver";
const Element = ({ number }) => {
  const ref = useRef();
  const isVisible = useOnScreenIntersectionObserver(ref);
  // console.log("isVisible ", isVisible);

  return (
    <div ref={ref} className="box">
      {number}
      {isVisible ? `I am on screen` : `I am invisible`}
    </div>
  );
};

export { Element };
