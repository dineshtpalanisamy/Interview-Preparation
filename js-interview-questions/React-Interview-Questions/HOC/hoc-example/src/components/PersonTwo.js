// import React, { useState } from "react";
import HigherOrderComponent from "./HigherOrderComponent";

function PersonTwo({ money, handleAmount }) {
  // const [money, setMoney] = useState(10);
  // const handleAmount = () => {
  //   return setMoney(money * 2);
  // };

  return (
    <div>
      <h2> Persontwo auction amount : {money}</h2>
      <button onClick={handleAmount}> Increment money </button>
    </div>
  );
}

export default HigherOrderComponent(PersonTwo);
