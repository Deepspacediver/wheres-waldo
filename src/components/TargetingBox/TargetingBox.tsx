import {
  useRef,
  MouseEvent,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";
import { CSSTransition } from "react-transition-group";
import { capitalize } from "../../helpers/utilFunctions";
import type {
  CharacterCoords,
  Characters,
  FoundCharacters,
  PlayerGuessResult,
} from "../../common/types";
import "./TargetingBox.styles.css";

interface TargetingBoxProps {
  left: number;
  top: number;
  isActive: boolean;
  charactersPosition: Characters | undefined;
  setFoundCharacters: Dispatch<SetStateAction<FoundCharacters>>;
  charChoiceElement: (characterName: string) => ReactElement | false;
  setFeedbackStyle: Dispatch<SetStateAction<PlayerGuessResult | null>>;
}

const TargetingBox = ({
  left,
  top,
  isActive,
  charactersPosition,
  charChoiceElement,
  setFoundCharacters,
  setFeedbackStyle,
}: TargetingBoxProps) => {
  const targetingBoxRef = useRef<HTMLDivElement>(null);
  const divWrappRef = useRef<HTMLDivElement>(null);

  const getTargetLocation = () => {
    const targetingBoxRect = targetingBoxRef.current?.getBoundingClientRect();
    const parentRect =
      targetingBoxRef.current?.parentElement?.getBoundingClientRect();

    if (!targetingBoxRect || !parentRect) return;
    const calculatedLeft = left - targetingBoxRect.width / 2;
    const calculatedTop = top - targetingBoxRect.height / 2;

    const topCoord =
      ((calculatedTop - parentRect.top) / parentRect.height) * 100;
    const leftCoord =
      ((calculatedLeft - parentRect.left) / parentRect.width) * 100;
    console.log({ leftCoord });
    const bottomCoord =
      ((calculatedTop - parentRect.top + targetingBoxRect.height) /
        parentRect.height) *
      100;
    const rightCoord =
      ((calculatedLeft - parentRect.left + targetingBoxRect.width) /
        parentRect.width) *
      100;

    // console.log({ topCoord, leftCoord, bottomCoord, rightCoord });
    return {
      top: topCoord,
      left: leftCoord,
      bottom: bottomCoord,
      right: rightCoord,
    };
  };

  const checkOverlap = (
    targetingBoxPosition: CharacterCoords,
    characterPosition: CharacterCoords
  ) => {
    //If every condition returns true the elements do not overlap
    return !(
      targetingBoxPosition.top > characterPosition.bottom ||
      targetingBoxPosition.right < characterPosition.left ||
      targetingBoxPosition.bottom < characterPosition.top ||
      targetingBoxPosition.left > characterPosition.right
    );
  };

  const validateTarget = (e: MouseEvent<HTMLUListElement>) => {
    const button = e.target as HTMLButtonElement;
    if (!button.classList.contains("btn__character-choice")) return;

    const characterName = button.textContent?.toLowerCase();
    const targetingBoxPosition = getTargetLocation();
    if (!characterName || !targetingBoxPosition || !charactersPosition) return;

    const isOverlapping = checkOverlap(
      targetingBoxPosition,
      charactersPosition[characterName]
    );
    if (isOverlapping) {
      // Left and top is set from cursorCoords
      // with calculated offset to position FoundTag properly
      setFoundCharacters((prevState) => [
        ...prevState,
        {
          right: targetingBoxPosition.right,
          bottom: targetingBoxPosition.bottom,
          left,
          top,
          name: characterName,
        },
      ]);
      setFeedbackStyle({
        characterName: characterName,
        isCorrect: true,
        TargetBoxLeftCoord: left,
      });
      console.log(`You found ${capitalize(characterName)}!`);
    } else {
      setFeedbackStyle({
        characterName: characterName,
        isCorrect: false,
        TargetBoxLeftCoord: left,
      });
      console.log(`That's not ${capitalize(characterName)}, try again.`);
    }
  };

  const helmetLi = charChoiceElement("helmet");
  const richardLi = charChoiceElement("richard");
  const rasmusLi = charChoiceElement("rasmus");

  return (
    <>
      {/* {isActive && ( */}
      <CSSTransition
        classNames="targeting-box"
        in={isActive}
        timeout={70}
        unmountOnExit
        nodeRef={targetingBoxRef}
      >
        <div
          className="targeting-box"
          style={{ left: `${left}px`, top: `${top}px` }}
          ref={targetingBoxRef}
        >
          <CSSTransition
            classNames="targeting-box_list-wrapper"
            in={isActive}
            timeout={80}
            unmountOnExit
            nodeRef={divWrappRef}
            appear
          >
            {/* Required nodeRef canncels transition on UL, wrapper fixes it */}
            <div className="targeting-box_list-wrapper" ref={divWrappRef}>
              <ul className="targeting-box_list" onClick={validateTarget}>
                {helmetLi}
                {richardLi}
                {rasmusLi}
              </ul>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
      {/* )} */}
    </>
  );
};

export default TargetingBox;
