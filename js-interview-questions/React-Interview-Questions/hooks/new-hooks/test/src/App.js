import React, { useState, useCallback, useRef } from "react";
import { useHasFocus } from "./hooks/useHasFocus";
import { useClickOutSide } from "./hooks/useClickOutSide";
import { usePrevious } from "./hooks/usePrevious";
// import { useOnScreenIntersectionObserver } from "./hooks/useOnScreenHookByIntersectionObserver";
import { useWhyDidYouUpdate } from "./hooks/useWhyDidYouUpdate";
import { useDebounce } from "./hooks/useDebounce";
import { UseThrottleComponent } from "./components/useThrottleComponent";
import { useResponsive } from "./hooks/useResponsive";
import { useCopy } from "./hooks/useCopy";
import { useToggle } from "./hooks/useToggle";

// components
import List from "./List";
import DummyComponent from "./components/DummyComponent";
import AsyncComponent from "./components/AsyncComponent";
import { FetchComponent } from "./components/FetchComponent";
import { ScriptComponent } from "./components/ScriptComponent";
import { DeepCompareEffectComponent } from "./components/DeepCompareEffectComponent";

const Counter = React.memo((props) => {
  useWhyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.counts}</div>;
});

function App() {
  const [counts, setCounts] = useState(0);
  const [testCase, setTestCase] = useState(null);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  console.log(" responsive ------ check", isMobile, isTablet, isDesktop);
  const onChange = (e) => {
    console.log(e.target.value);
  };

  const debounceSearch = useDebounce(onChange, 5000);
  const counterStyle = {
    fontSize: "3rem",
    color: "red",
  };

  const [value, setValue] = useState("");
  const [currentValue, toggleValue] = useToggle([1, 2, 3, 4, 5], 2);
  const focus = useHasFocus();
  const ref = useRef();
  const [count, setCount] = useState(0);

  // get the previous value passed into the hook on the last render
  const prevCount = usePrevious(count);
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
      <div>
        <h1>
          Now: {count}, before: {prevCount}
        </h1>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
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
      <div>
        <div className="counter">
          <Counter
            counts={counts}
            style={counterStyle}
            testCaseWithArray={testCase}
            function={() => console.log(counts)}
          />
          <button
            onClick={() => {
              setCounts(counts + 1);
              setTestCase([counts + 1]);
            }}
          >
            Increment
          </button>
        </div>
      </div>
      <UseThrottleComponent />
      <div>
        <input
          type="search"
          onChange={debounceSearch}
          placeholder="Enter your Query"
        />
      </div>
      <div>
        <AsyncComponent />

        <FetchComponent />
        <ScriptComponent />
        <DeepCompareEffectComponent />
      </div>
    </div>
  );
}

export default App;
