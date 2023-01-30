import { useState, useRef, useEffect, memo, MouseEvent } from "react";
import Overlay from "../Overlay/Overlay";
import SubmitScore from "../SubmitScore/SubmitScore";
import Scoreboard from "../Scoreboard/Scoreboard";
import "./Stopwatch.styles.css";

type Timer = ReturnType<typeof setInterval>;
interface StopwatchProps {
  isGameOver: () => boolean;
  canStartGame: boolean;
}

const Stopwatch = memo(({ isGameOver, canStartGame }: StopwatchProps) => {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isScoreSubmit, setIsScoreSubmit] = useState(false);
  const intervalRef = useRef<Timer | null>(null);
  console.log("stopwatch");

  useEffect(() => {
    const startStopwatch = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setStartTime(Date.now());
      setCurrentTime(Date.now());
      intervalRef.current = setInterval(() => setCurrentTime(Date.now()), 10);
    };
    if (canStartGame) startStopwatch();
  }, [canStartGame]);

  useEffect(() => {
    if (isGameOver() && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [isGameOver]);

  let timePassed = 0;
  let minutes = 0;
  let seconds = 0;

  if (startTime && currentTime) {
    timePassed = (currentTime - startTime) / 1000;
    minutes = Math.trunc(timePassed / 60);
    seconds = Math.trunc(timePassed % 60);
  }

  return (
    <div>
      <div>
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </div>
      {isGameOver() && (
        <Overlay>
          {!isScoreSubmit ? (
            <SubmitScore
              time={timePassed}
              setIsScoreSubmit={setIsScoreSubmit}
            />
          ) : (
            <Scoreboard />
          )}
        </Overlay>
      )}
    </div>
  );
});
export default Stopwatch;
