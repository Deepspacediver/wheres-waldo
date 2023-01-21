import React, { MouseEvent } from "react";
import hotlineImage from "../../assets/images/main-image/hotline-miami-image.webp";

interface ImageProps {
  handleTag?: (e: MouseEvent<HTMLImageElement>) => void;
}

const Image = ({ handleTag }: ImageProps) => {
  return (
    <img
      src={hotlineImage}
      alt="tag hotline miami character"
      className="hotline-miami-img"
    />
  );
};

export default Image;

