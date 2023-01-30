import React, { useState, useEffect } from "react";
import { capitalize } from "../../helpers/utilFunctions";
import { PlayerGuessResult } from "../../common/types";
import "./TagFeedback.styles.css";

interface TagFeedbackProps extends PlayerGuessResult {}

const TagFeedback = ({
  isCorrect,
  characterName,
  TargetBoxLeftCoord,
}: TagFeedbackProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const correctStyle = { backgroundColor: "green" };
  const wrongStyle = { backgroundColor: "red" };
  console.log(isVisible);

  useEffect(() => {
    setIsVisible(true);
    let timer = setTimeout(() => setIsVisible(false), 4000);
    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [TargetBoxLeftCoord, setIsVisible]);

  const correctGuess = `Nice! You found ${capitalize(characterName)}`;
  const wrongGuess = `Keep looking! That was not ${capitalize(characterName)}`;

  return isVisible ? (
    <div className="tag-feedback" style={isCorrect ? correctStyle : wrongStyle}>
      {isCorrect ? correctGuess : wrongGuess}
    </div>
  ) : null;
};

export default TagFeedback;
