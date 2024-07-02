// There are times when we want to detect if the user has clicked outside the component or not. Let us see how can we create the useOnClickOutside() hook in React that will help us to detect it.

// useOnClickOutside(ref, callback) will accept the component/element reference and the callback function and will invoke the callback function if clicked outside the reference.

// All we have to do is listen to the mouse and touch event like mousedown, touchstart and on the event fire check if the event.target is not the descendant of the reference then invoke the callback.

// Wrap this logic inside the useEffect() hook so that we can assign and remove listeners.

function useOnClickOutside(ref, callback) {
  useEffect(
    () => {
      const listener = (event) => {
        // if the referenece is not present
        // or the target is descendant of the refefence
        // return
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        // invoke the callback
        callback(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },

    // add ref and callback to effect dependencies
    [ref, callback]
  );
}

// Input:
function Example() {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    console.log("Clicked");
  });

  return (
    <div>
      <p>Outside Click me!</p>
      <p ref={ref}>Click me!</p>
    </div>
  );
}

// Output:
// "Clicked" // when clicked on Outside Click me!
