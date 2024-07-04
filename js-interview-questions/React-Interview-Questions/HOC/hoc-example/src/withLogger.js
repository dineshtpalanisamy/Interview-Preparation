import React, { useEffect } from "react";

const withLogger = (OriginalComponent) => {
  const WithLogger = (props) => {
    useEffect(() => {
      // Log data on component mount
      console.log(`Component ${OriginalComponent.name} mounted.`);
      return () => {
        // Log data on component unmount
        console.log(`Component ${OriginalComponent.name} unmounted.`);
      };
    }, []);

    useEffect(() => {
      // Log data on component update
      console.log(`Component ${OriginalComponent.name} updated.`);
    });

    return <OriginalComponent {...props} />;
  };

  WithLogger.displayName = `withLogger(${
    OriginalComponent.displayName || OriginalComponent.name
  })`;
  return WithLogger;
};

export default withLogger;
