import { useState, useRef, useEffect, memo, MouseEvent } from "react";
import "./Stopwatch.styles.css";

type Timer = ReturnType<typeof setInterval>;
interface StopwatchProps {
  isGameOver: () => boolean;
}

const Stopwatch = memo(({ isGameOver }: StopwatchProps) => {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<Timer | null>(null);

  useEffect(() => {
    if (isGameOver() && intervalRef.current) clearInterval(intervalRef.current);
  }, [isGameOver]);

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
});
export default Stopwatch;
