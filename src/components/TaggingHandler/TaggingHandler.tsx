import React, { ReactNode, useState } from "react";
import { MouseEvent } from "react";
import Image from "../Image/Image";
import CharacterDropdown from "../CharacterDropdown/CharacterDropdown";
import "./TaggingHandler.styles.css";

interface TagLocation {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

const TaggingHandler = () => {
  const [tagLocation, setTagLocation] = useState<TagLocation>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const [isActive, setIsActive] = useState(false);

  const handleTag = (e: MouseEvent<HTMLDivElement>) => {
    setIsActive((prevState) => !prevState);
    if (isActive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const topPosition = ((e.clientY - rect.top - 32) / rect.height) * 100;
    const leftPosition = ((e.clientX - rect.left - 32) / rect.width) * 100;
    const bottomPosition = ((e.clientY - rect.top + 32) / rect.height) * 100;
    const rightPosition = ((e.clientX - rect.left + 32) / rect.width) * 100;

    setTagLocation({
      top: topPosition,
      left: leftPosition,
      bottom: bottomPosition,
      right: rightPosition,
    });
  };

  const { top, left } = tagLocation;
  return (
    <div className="image-wrapper" onClick={handleTag}>
      <Image />
      <CharacterDropdown left={left} top={top} isActive={isActive} />
    </div>
  );
};

export default TaggingHandler;
