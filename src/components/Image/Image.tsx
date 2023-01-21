import React, { MouseEvent } from "react";

interface ImageProps {
  src: string;
  alt: string;
  name: string;
}

const Image = ({ src, alt, name }: ImageProps) => {
  return <img src={src} alt={alt} className="hotline-miami-img" />;
};

export default Image;
