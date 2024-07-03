import React from "react";
import { useAsync } from "../hooks/useAsync";

function AsyncComponent() {
  const { loading, error, value } = useAsync(() => {
    return new Promise((resolve, reject) => {
      const success = true;
      setTimeout(() => {
        success ? resolve("Hi") : reject("Error");
      }, 1000);
    });
  });

  return (
    <div>
      <div>Loading example of useAsync Hook: {loading.toString()}</div>
      <div>{error}</div>
      <div>{value}</div>
    </div>
  );
}

export default AsyncComponent;
