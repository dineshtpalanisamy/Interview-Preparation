import { useState } from "react";

function HigherOrderComponent(OriginalComponent) {
  // console.log(" Original Component : ", OriginalComponent);
  function NewUpdatedComponent() {
    // console.log(" Updated component", OriginalComponent);
    const [money, setMoney] = useState(10);
    const handleAmount = () => {
      return setMoney(money * 2);
    };
    return <OriginalComponent moneyy={money} handleAmountt={handleAmount} />;
  }
  return NewUpdatedComponent;

  // return (
  //   <div>

  //   </div>
  // )
}

export default HigherOrderComponent;
