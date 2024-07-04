// import React, { useState } from "react";
import HigherOrderComponent from "./HigherOrderComponent";

function PersonTwo({ moneyy, handleAmountt }) {
  // const [money, setMoney] = useState(10);
  // const handleAmount = () => {
  //   return setMoney(money * 2);
  // };

  return (
    <div>
      <h2> Persontwo auction amount : {moneyy}</h2>
      <button onClick={handleAmountt}> Increment money </button>
    </div>
  );
}

export default HigherOrderComponent(PersonTwo);
