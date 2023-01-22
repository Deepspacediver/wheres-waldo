import { useState, ReactNode, forwardRef, ForwardedRef } from "react";
import "./CharacterDropdown.styles.css";

export interface CharacterDropdownType {
  left: number;
  top: number;
  isActive: boolean;
}

export type CharacterRef = HTMLDivElement;

const CharacterDropdown = forwardRef<CharacterRef, CharacterDropdownType>(
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

export default CharacterDropdown;
