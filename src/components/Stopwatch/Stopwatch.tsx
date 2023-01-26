import { useState, useRef, MouseEvent } from "react";
import "./Stopwatch.styles.css";

type Timer = ReturnType<typeof setInterval>;

const Stopwatch = () => {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<Timer | null>(null);

  const startStopwatch = (e: MouseEvent<HTMLButtonElement>) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    intervalRef.current = setInterval(() => setCurrentTime(Date.now()), 10);
  };

  let timePassed = 0;

  if (startTime && currentTime) {
    timePassed = (currentTime - startTime) / 1000;
  }

  return (
    <div>
      <div>{timePassed.toFixed(2)}</div>
      <button onClick={startStopwatch}> Start</button>
    </div>
  );
};
export default Stopwatch;
