import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  name: string;
}

const Image = ({ src, alt, name }: ImageProps) => {
  return <img src={src} alt={alt} className={`${name}-img`} />;
};

export default Image;
