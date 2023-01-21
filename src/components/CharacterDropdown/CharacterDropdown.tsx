import { useState, ReactNode } from "react";
import "./CharacterDropdown.styles.css";

export interface CharacterDropdownProps {
  left: number;
  top: number;
  isActive: boolean;
}
const CharacterDropdown = ({ left, top, isActive }: CharacterDropdownProps) => {
  return (
    <>
      {isActive && (
        <div
          className="character-dropdown"
          style={{ left: `${left}%`, top: `${top}%` }}
        ></div>
      )}
    </>
  );
};

export default CharacterDropdown;
