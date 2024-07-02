import { useEffect, useState } from "react";

function useOnScreenIntersectionObserver(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => setIsIntersecting(entry.isIntersecting));

      // setIsIntersecting(entries.isIntersecting);
    },
    {
      threshold: 1,
      // rootMargin: "100px",
    }
  );

  useEffect(() => {
    observer.observe(ref.current);
    // remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);
  console.log("isIntersecting", isIntersecting);
  return isIntersecting;
}
export { useOnScreenIntersectionObserver };
