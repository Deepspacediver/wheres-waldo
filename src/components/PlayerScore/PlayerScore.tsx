import React from "react";
import type { Player } from "../../common/types";
import "./PlayerScore.styles.css";

interface PlayerScoreProps extends Player {}

const PlayerScore = ({ name, time }: PlayerScoreProps) => {
  return (
    <>
      <p>Player: {name}</p>
      <p>Score: {time} s</p>
    </>
  );
};

export default PlayerScore;
