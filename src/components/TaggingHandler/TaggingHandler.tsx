import React, { useState, useRef, useEffect, useCallback } from "react";
import { MouseEvent } from "react";
import getCharacterPositions from "../../firebase/firebase-config";
import { capitalize } from "../../helpers/utilFunctions";
import type {
  Characters,
  FoundCharacters,
  PlayerGuessResult,
} from "../../common/types";
import Image from "../Image/Image";
import TargetingBox from "../TargetingBox/TargetingBox";
import Stopwatch from "../Stopwatch/Stopwatch";
import FoundTag from "../FoundTag/FoundTag";
import TagFeedback from "../TagFeedback/TagFeedback";
import Header from "../Header/Header";
import hotlineBackground from "../../assets/images/main-image/hotline-miami-image.webp";
import "./TaggingHandler.styles.css";

interface TaggingHandlerProps {
  canStartGame: boolean;
}

const TaggingHandler = ({ canStartGame }: TaggingHandlerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [cursorCoords, setCursorCoords] = useState({
    left: 0,
    top: 0,
  });
  const [foundCharacters, setFoundCharacters] = useState<FoundCharacters>([]);
  const [feedbackStyle, setFeedbackStyle] = useState<PlayerGuessResult | null>(
    null
  );
  const charactersLocations = useRef<Characters>();

  useEffect(() => {
    let mounted = true;
    getCharacterPositions().then((data) => {
      if (mounted) charactersLocations.current = data;
    });

    return () => {
      mounted = false;
    };
  }, []);
  const handleTag = (e: MouseEvent) => {
    const target = e.target as HTMLImageElement;
    setIsActive((prevState) => !prevState);
    if (isActive) return;
    if (target.tagName !== "IMG") return;
    setCursorCoords({
      left: e.clientX - target.getBoundingClientRect().left,
      top: e.clientY - target.getBoundingClientRect().top,
    });
  };

  const charChoiceElement = (
    characterName: string,
    array = foundCharacters
  ) => {
    const isNotFound = array.every((el) => el.name !== characterName);
    return (
      isNotFound && (
        <li>
          <button className="btn btn__character-choice">
            {capitalize(characterName)}
          </button>
        </li>
      )
    );
  };

  const isGameOver = useCallback(
    () => foundCharacters.length === 3,
    [foundCharacters.length]
  );

  const { left, top } = cursorCoords;
  return (
    <>
      <Header>
        <Stopwatch isGameOver={isGameOver} canStartGame={canStartGame} />
        {feedbackStyle && (
          <TagFeedback
            isCorrect={feedbackStyle.isCorrect}
            characterName={feedbackStyle.characterName}
            TargetBoxLeftCoord={feedbackStyle.TargetBoxLeftCoord}
          />
        )}
      </Header>
      <div
        className="image-wrapper"
        onClick={(e) => {
          handleTag(e);
          const target = e.target as HTMLImageElement;
          console.log(target.getBoundingClientRect());
        }}
      >
        <Image
          src={hotlineBackground}
          alt="hotline miami characters"
          name="main-background"
        />
        <TargetingBox
          left={left}
          top={top}
          isActive={isActive}
          charactersPosition={charactersLocations.current}
          charChoiceElement={charChoiceElement}
          setFoundCharacters={setFoundCharacters}
          setFeedbackStyle={setFeedbackStyle}
        />
        {foundCharacters.length !== 0 &&
          foundCharacters.map((char, i) => {
            return (
              <FoundTag
                key={i}
                left={char.left}
                top={char.top}
                name={char.name}
              />
            );
          })}
      </div>
    </>
  );
};

export default TaggingHandler;
