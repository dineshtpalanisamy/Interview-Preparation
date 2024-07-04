// import React, { useState } from "react";
import HigherOrderComponent from "./HigherOrderComponent";

function PersonOne({ moneyy, handleAmountt }) {
  // debugger;
  // const [money, setMoney] = useState(10);
  // const handleAmount = () => {
  //   return setMoney(money * 2);
  // };

  return (
    <div>
      <h2> PersonOne auction amount : {moneyy}</h2>
      <button onClick={handleAmountt}> Increment money </button>
    </div>
  );
}

export default HigherOrderComponent(PersonOne);
