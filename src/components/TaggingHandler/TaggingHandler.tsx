import React, { useState, useRef, useEffect, useCallback } from "react";
import { MouseEvent } from "react";
import getCharacterPositions from "../../firebase/firebase-config";
import { capitalize } from "../../helpers/utilFunctions";
import type {
  Characters,
  FoundCharacters,
} from "../../common/types";
import Image from "../Image/Image";
import TargetingBox from "../TargetingBox/TargetingBox";
import Stopwatch from "../Stopwatch/Stopwatch";
import FoundTag from "../FoundTag/FoundTag";
import hotlineBackground from "../../assets/images/main-image/hotline-miami-image.webp";
import "./TaggingHandler.styles.css";

const TaggingHandler = () => {
  const [isActive, setIsActive] = useState(false);
  const [cursorCoords, setCursorCoords] = useState({
    left: 0,
    top: 0,
  });
  const [foundCharacters, setFoundCharacters] = useState<FoundCharacters>([]);
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
    // console.log(charactersLocations.current);
    // console.log(foundCharacters);
    // console.log(isGameOver());
    const target = e.target as HTMLImageElement;
    setIsActive((prevState) => !prevState);
    if (target.tagName !== "IMG") return;
    console.log(target);
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
      <div className="image-wrapper" onClick={handleTag}>
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
      <Stopwatch isGameOver={isGameOver} />
    </>
  );
};

export default TaggingHandler;
