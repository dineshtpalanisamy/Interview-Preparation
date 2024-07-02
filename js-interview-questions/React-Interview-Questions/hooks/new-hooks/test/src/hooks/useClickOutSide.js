import { useEffect } from "react";

function useClickOutSide(ref, callBack) {
  useEffect(() => {
    const clickListener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callBack();
    };

    document.addEventListener("mousedown", clickListener);
    document.addEventListener("touchstart", clickListener);

    return () => {
      document.removeEventListener("mousedown", clickListener);
      document.removeEventListener("touchstart", clickListener);
    };
  }, [ref, callBack]);
}

export { useClickOutSide };
