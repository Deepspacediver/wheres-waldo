import React, { MouseEvent } from "react";
import hotlineImage from "../../assets/images/hotline-miami-image.webp";

interface ImageProps {
  handleTag?: (e: MouseEvent<HTMLImageElement>) => void;
}

const Image = ({ handleTag }: ImageProps) => {
  return (
    <img
      onClick={handleTag}
      src={hotlineImage}
      alt="tag hotline miami character"
      className="hotline-miami-img"
    />
  );
};

export default Image;

/* pageX
: 
616
pageY
: 
371
relatedTarget
: 
null
screenX
: 
2536
screenY
: 
477 */
