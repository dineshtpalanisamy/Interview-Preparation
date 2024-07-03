import React from "react";
import { useScript } from "../hooks/useScript";

function ScriptComponent() {
  const { loading, error } = useScript(
    "https://code.jquery.com/jquery-3.6.0.min.js"
  );

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <p> example of useScript : {window.$(window).width()}</p>
    </div>
  );
}

export { ScriptComponent };
