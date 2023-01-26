import { useRef, MouseEvent, ReactElement } from "react";
import type { CharacterCoords, Characters } from "../../common/types";
import "./TargetingBox.styles.css";

interface TargetingBoxProps {
  left: number;
  top: number;
  isActive: boolean;
  charactersPosition: Characters | undefined;
  charChoiceElement: (characterName: string) => ReactElement | false;
  addFoundCharacter: (characterName: string) => void;
}

const TargetingBox = ({
  left,
  top,
  isActive,
  charactersPosition,
  charChoiceElement,
  addFoundCharacter,
}: TargetingBoxProps) => {
  const targetingBoxRef = useRef<HTMLDivElement>(null);

  const getTargetLocation = () => {
    const targetingBoxRect = targetingBoxRef.current?.getBoundingClientRect();
    const parentRect =
      targetingBoxRef.current?.parentElement?.getBoundingClientRect();

    if (!targetingBoxRect || !parentRect) return;
    const calculatedLeft = left - targetingBoxRect.width / 2;
    console.log({ calculatedLeft });
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

    console.log({ topCoord, leftCoord, bottomCoord, rightCoord });
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
    console.log(button);
    if (!button.classList.contains("btn__character-choice")) return;
    const characterName = button.textContent?.toLowerCase();
    const targetingBoxPosition = getTargetLocation();
    if (!characterName || !targetingBoxPosition || !charactersPosition) return;

    const isOverlapping = checkOverlap(
      targetingBoxPosition,
      charactersPosition[characterName]
    );
    if (isOverlapping) {
      addFoundCharacter(characterName);
    }

    // User clicked btn => get text content => call getTargetLocation =>
    // => compare return of targetLocation and fetchedData with
    // corresponding name from the event
  };

  const helmetLi = charChoiceElement("helmet");
  const richardLi = charChoiceElement("rasmus");
  const rasmusLi = charChoiceElement("richard");

  return (
    <>
      {isActive && (
        <div
          className="targeting-box"
          style={{ left: `${left}px`, top: `${top}px` }}
          ref={targetingBoxRef}
        >
          <ul className="targeting-box_list" onClick={validateTarget}>
            {helmetLi}
            {richardLi}
            {rasmusLi}
          </ul>
        </div>
      )}
    </>
  );
};

export default TargetingBox;
