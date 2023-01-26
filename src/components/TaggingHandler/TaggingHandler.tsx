import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { MouseEvent } from "react";
import getCharacterPositions from "../../firebase/firebase-config";
import type { Characters } from "../../common/types";
import Image from "../Image/Image";
import TargetingBox from "../TargetingBox/TargetingBox";
import hotlineBackground from "../../assets/images/main-image/hotline-miami-image.webp";
import "./TaggingHandler.styles.css";

const TaggingHandler = () => {
  const [isActive, setIsActive] = useState(false);
  const [cursorCoords, setCursorCoords] = useState({
    left: 0,
    top: 0,
  });
  const [foundCharacters, setFoundCharacters] = useState<string[]>([]);
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
    console.log(charactersLocations.current);
    console.log(foundCharacters);
    const target = e.target as HTMLElement;
    if (target.classList.contains("btn")) return;

    setIsActive((prevState) => !prevState);
    console.log(e.clientX, e.clientY);
    setCursorCoords({
      left: e.clientX,
      top: e.clientY,
    });
  };

  const capitalize = (x: string) => x[0].toUpperCase() + x.slice(1);

  const charChoiceElement = (characterName: string) =>
    !foundCharacters.includes(characterName) && (
      <li>
        <button className="btn btn__character-choice">
          {capitalize(characterName)}
        </button>
      </li>
    );

  const addFoundCharacter = (characterName: string) =>
    setFoundCharacters((prevState) => [...prevState, characterName]);

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
          addFoundCharacter={addFoundCharacter}
        />
      </div>
    </>
  );
};

export default TaggingHandler;
