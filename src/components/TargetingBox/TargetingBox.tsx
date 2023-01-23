import { forwardRef } from "react";
import "./TargetingBox.styles.css";

export interface TargetingBoxProps {
  left: number;
  top: number;
  isActive: boolean;
}

export type CharacterRef = HTMLDivElement;

const TargetingBox = forwardRef<CharacterRef, TargetingBoxProps>(
  ({ left, top, isActive }, ref) => {
    return (
      <>
        {isActive && (
          <div
            className="character-dropdown"
            style={{ left: `${left}%`, top: `${top}%` }}
            ref={ref}
          ></div>
        )}
      </>
    );
  }
);

export default TargetingBox;
