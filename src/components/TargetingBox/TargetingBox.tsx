import { useRef } from "react";
import { MouseEvent } from "react";
import type { CharacterCoords, Characters } from "../../common/types";
import "./TargetingBox.styles.css";

interface TargetingBoxProps {
  left: number;
  top: number;
  isActive: boolean;
  charactersLocations?: Characters;
}

const TargetingBox = ({ left, top, isActive }: TargetingBoxProps) => {
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
  };

  return (
    <>
      {isActive && (
        <div
          className="targeting-box"
          style={{ left: `${left}px`, top: `${top}px` }}
          ref={targetingBoxRef}
        >
          <ul className="targeting-box_list" onClick={getTargetLocation}>
            <li>
              <button className="btn">Helmet</button>{" "}
            </li>
            <li>
              <button className="btn">Rasmus</button>
            </li>
            <li>
              <button className="btn">Richard</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default TargetingBox;
