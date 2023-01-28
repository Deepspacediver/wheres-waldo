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
