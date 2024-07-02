// Using getBoundingClientRect()
// Unlike Intersection Observer, here we will have to perform simple calculations to determine if the element is in the viewport or not.

// If the top of the element is greater than zero but less than the window.innerHeight then it is in the viewport. We can also add some offset in case we want a buffer.

// Assign a scroll event on the window and inside the listener get the getBoundingClientRect() of the element. Perform the calculation and update the state accordingly.

function useOnScreen2(ref) {
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

const Element = ({ number }) => {
  const ref = useRef();
  const isVisible = useOnScreen2(ref);

  return (
    <div ref={ref} className="box">
      {number}
      {isVisible ? `I am on screen` : `I am invisible`}
    </div>
  );
};

const DummyComponent = () => {
  const arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(<Element key={i} number={i} />);
  }

  return arr;
};

export default DummyComponent;
