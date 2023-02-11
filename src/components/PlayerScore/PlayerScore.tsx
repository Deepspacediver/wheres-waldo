import React from "react";
import { convertTime } from "../../helpers/utilFunctions";
import type { Player } from "../../common/types";
import "./PlayerScore.styles.css";

interface PlayerScoreProps extends Player {}

const PlayerScore = ({ name, time }: PlayerScoreProps) => {
  const { minutes, seconds } = convertTime(time);
  return (
    <>
      <p>{name}</p>
      <p className="scoreboard__time">
        {minutes}:{seconds}
      </p>
    </>
  );
};

export default PlayerScore;
