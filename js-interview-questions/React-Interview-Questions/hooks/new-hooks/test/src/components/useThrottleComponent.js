import { useThrottle } from "../hooks/useThrottle";

const UseThrottleComponent = () => {
  const print = () => {
    console.log("hello");
  };

  const throttled = useThrottle(print, 2500, {
    leading: true,
    trailing: false,
  });
  console.log(throttled);

  return <button onClick={throttled}> click me</button>;
};

export { UseThrottleComponent };
