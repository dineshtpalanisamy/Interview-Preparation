import { useState, useCallback, useRef } from "react";
import { useHasFocus } from "./hooks/useHasFocus";
import { useClickOutSide } from "./hooks/useClickOutSide";
// import { useOnScreenIntersectionObserver } from "./hooks/useOnScreenHookByIntersectionObserver";
import List from "./List";
import DummyComponent from "./components/DummyComponent";
const useCopy = () => {
  // accept text and returns a function to display the text
  const copy = async (text) => {
    // options to copy the data in the browser otherwise no use
    if (!navigator?.clipboard) {
      // if not enabled
      console.warn(" Clipboard is not enabled or available ");
      return;
    } else {
      // async method so try catch
      try {
        await navigator.clipboard.writeText(text); // accepts the text and copies it to the clipboard
      } catch (err) {
        console.error(` There was error copying text :  ${text} `, err);
      }
    }
  };
  return copy;
};

// const useToggle = (arr, index = 0) => {
//   const [currentIndex, setCurrentIndex] = useState(index);

//   const toggle = useCallback(() => {
//     return setCurrentIndex((prevIndex) => {
//       const index = prevIndex >= arr.length - 1 ? 0 : prevIndex + 1;
//       console.log(" Index ", index);
//       console.log(" Value ", arr[index]);
//       return index;
//     });
//   }, [arr]);
//   return [arr[currentIndex], toggle];
// };

const useToggle = (array, index = 0) => {
  const [Index, setIndex] = useState(index);
  const toggle = useCallback(() => {
    return setIndex((prevIndex) =>
      prevIndex >= array.length - 1 ? 0 : prevIndex + 1
    );
  }, [array]);
  return [array[Index], toggle];
};

function App() {
  const [value, setValue] = useState("");
  const [currentValue, toggleValue] = useToggle([1, 2, 3, 4, 5], 2);
  const focus = useHasFocus();
  const ref = useRef();
  useClickOutSide(ref, () => {
    console.log(" Clicked outsid the component");
  });

  //useCallBackHook useCase
  // whenever a number changes when clicking
  // the app component re-renders , so when we click toggle theme
  // the App component re-renders for every re-rendering
  // getItems() func is created again and again
  // so to avoid we re-rendering wile clicking toggleTheme button
  // to avoid invoking new getItems function we use useCallBAck hook
  // when the getItems is passed to LIST component it goes in as a newly created function
  // even if the dependencies does not change
  // what useCallback is going to do is that does not create a new function unless
  // there is a change in numbers (i.e) numbers inside dependency array
  const [dark, setDark] = useState(false);
  const [number, setNumber] = useState(1);

  const copy = useCopy();
  const getItems = useCallback(
    (incrementor) => {
      return [
        number + incrementor,
        number + 1 + incrementor,
        number + 2 + incrementor,
      ];
    },
    [number]
  ); // recreates the function and renders the app component only when number changes
  // this the difference btw useMemo and useCB (i.e) => useMemo does not return the function it only
  // returns the value of returned output of the function
  // and useCB returns the entire func and creates a new function only when dependency changes and app comp renders
  const theme = {
    backgroundColor: dark ? "#333" : "#FFF",
    color: dark ? "#FFF" : "#333",
  };

  return (
    <div className="App">
      <div>{`Focus : ${focus}`}</div>

      <div>
        <p>Outside Click me!</p>
        <p ref={ref}>Click me!</p>
      </div>

      <div>
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></textarea>
      </div>
      <button onClick={() => copy(value)}>Copy</button>
      <div>
        {}
        {/* <h1> CurrentValue : {setToggle}</h1> */}
        <button onClick={toggleValue}> CurrentValue :{currentValue}</button>
      </div>
      <div style={theme}>
        <input
          type="number"
          // value={number ? number : 0}
          defaultValue={1}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <button onClick={() => setDark((prevtheme) => !prevtheme)}>
          Toggle Theme
        </button>
        <List getItems={getItems} />
      </div>
      <div>
        <DummyComponent />
      </div>
    </div>
  );
}

export default App;
