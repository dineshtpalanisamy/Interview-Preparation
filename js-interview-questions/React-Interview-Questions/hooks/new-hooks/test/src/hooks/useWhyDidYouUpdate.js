// look for changes and current values and tell the reason for re-render

import { useRef, useEffect } from "react";

const useWhyDidYouUpdate = (compName, propToCheck) => {
  const previousValue = useRef();

  useEffect(() => {
    if (previousValue.current) {
      const keys = Object.keys({ ...previousValue.current, ...propToCheck });
      const reasonForChange = {};
      keys.forEach((key) => {
        if (
          typeof previousValue.current[keys] === "object" &&
          typeof propToCheck[key] === "object"
        ) {
          if (
            JSON.stringify(previousValue.current[keys]) !==
            JSON.stringify(propToCheck[key])
          ) {
            reasonForChange[key] = {
              from: previousValue.current[key],
              to: propToCheck[key],
            };
          }
        } else {
          // if both are non-object
          if (previousValue.current[key] !== propToCheck[key]) {
            // add to changesObj
            reasonForChange[key] = {
              from: previousValue.current[key],
              to: propToCheck[key],
            };
          }
        }
      });
      if (Object.keys(reasonForChange).length) {
        console.log(
          "This is causing re-renders",
          compName,
          " component changed from : ",
          reasonForChange
        );
      }
    }
    previousValue.current = propToCheck;
  }, [compName, propToCheck]);
};

export { useWhyDidYouUpdate };
