import React, { useState, useRef, useEffect } from "react";
import { MouseEvent } from "react";
import Image from "../Image/Image";
import CharacterDropdown from "../CharacterDropdown/CharacterDropdown";
import hotlineBackground from "../../assets/images/main-image/hotline-miami-image.webp";
import "./TaggingHandler.styles.css";

const TaggingHandler = () => {
  const [tagLocation, setTagLocation] = useState({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [cursorCoords, setCursorCoords] = useState({
    x: 0,
    y: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const getTargetLocation = () => {
      const dropdownRect = dropdownRef.current?.getBoundingClientRect();
      const parentRect =
        dropdownRef.current?.parentElement?.getBoundingClientRect();

      if (!dropdownRect || !parentRect) return;
      const { x, y } = cursorCoords;
      const calculatedLeft = x - dropdownRect.width / 2;
      const calculatedTop = y - dropdownRect.height / 2;

      const topCoord =
        ((calculatedTop - parentRect.top) / parentRect.height) * 100;
      const leftCoord =
        ((calculatedLeft - parentRect.left) / parentRect.width) * 100;
      const bottomCoord =
        ((calculatedTop - parentRect.top + dropdownRect.height) /
          parentRect.height) *
        100;
      const rightCoord =
        ((calculatedLeft - parentRect.left + dropdownRect.width) /
          parentRect.width) *
        100;

      setTagLocation({
        top: topCoord,
        left: leftCoord,
        bottom: bottomCoord,
        right: rightCoord,
      });
    };

    getTargetLocation();
  }, [isActive, cursorCoords]);

  const handleTag = (e: MouseEvent<HTMLDivElement>) => {
    setIsActive((prevState) => !prevState);
    if (isActive) {
      setTagLocation({
        top: -9999999,
        left: 0,
        bottom: 0,
        right: 0,
      });
      return;
    }
    setCursorCoords({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const { top, left } = tagLocation;
  return (
    <>
      <div className="image-wrapper" onClick={handleTag}>
        <Image
          src={hotlineBackground}
          alt="hotline miami characters"
          name="main-background"
        />
        <CharacterDropdown
          ref={dropdownRef}
          left={left}
          top={top}
          isActive={isActive}
        />
      </div>
    </>
  );
};

export default TaggingHandler;
