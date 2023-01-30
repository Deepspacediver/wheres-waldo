import { ReactNode } from "react";

export interface CharacterCoords {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface Characters {
  [key: string]: CharacterCoords;
}
export interface FoundCharacter extends CharacterCoords {
  name: string;
}

export type FoundCharacters = FoundCharacter[];

export interface Player {
  name: string;
  time: number;
}

export type PlayerList = Player[];

export interface ChildrenAsProps {
  children?: ReactNode;
}

export interface PlayerGuessResult {
  isCorrect: boolean;
  characterName: string;
  TargetBoxLeftCoord: number;
}
