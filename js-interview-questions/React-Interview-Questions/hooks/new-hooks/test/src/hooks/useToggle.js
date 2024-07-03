import { useCallback, useState } from "react";

const useToggle = (array, index = 0) => {
  const [Index, setIndex] = useState(index);
  const toggle = useCallback(() => {
    return setIndex((prevIndex) =>
      prevIndex >= array.length - 1 ? 0 : prevIndex + 1
    );
  }, [array]);
  return [array[Index], toggle];
};

export { useToggle };
