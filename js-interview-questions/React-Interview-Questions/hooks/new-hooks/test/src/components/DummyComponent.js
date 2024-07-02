import { Element } from "./Element";

const DummyComponent = () => {
  const arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(<Element key={i} number={i + 1} />);
  }

  return arr;
};

export default DummyComponent;
