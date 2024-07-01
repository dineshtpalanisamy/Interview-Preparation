// const [toggle,value] = useToggle([1,2,3,4,5], 2)
// starts from index 2 and then while clicking toggle button
// it moves to next element and when reaching last element goes to first

const useToggle = (arr, index = 0) => {
  const [currentIndex, setCurrentIndex] = useState(index);

  const toggle = useCallback(() => {
    return setCurrentIndex((prevIndex) =>
      prevIndex >= arr.length ? 0 : prevIndex + 1
    );
  }, [arr]);
  return [toggle, arr[currentIndex]];
};

const [toggle, setToggle] = useToggle([1, 2, 3, 4, 5], 2);

console.log(" toggle : ", toggle);
