import React from "react";
import "./Header.styles.css";
import Image from "../Image/Image";
import HelmetImage from "../../assets/images/masks/helmet-mask.webp";
import RasmusImage from "../../assets/images/masks/rasmus-mask.webp";
import RichardImage from "../../assets/images/masks/richard-mask.webp";
import type { ChildrenAsProps } from "../../common/types";

interface HeaderProps extends ChildrenAsProps {}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="header">
      <section className="header__characters-container">
        <figure className="character-wrapper character-wrapper_header">
          <Image
            src={HelmetImage}
            alt="helmet mask image"
            name="character-wrapper__header-mask"
          />
          <figcaption className="character-wrapper__character-name_header">
            Helmet
          </figcaption>
        </figure>
        <figure className="character-wrapper character-wrapper_header">
          <Image
            src={RasmusImage}
            alt="rasmus mask image"
            name="character-wrapper__header-mask"
          />
          <figcaption className="character-wrapper__character-name_header">
            Rasmus
          </figcaption>
        </figure>
        <figure className="character-wrapper character-wrapper_header">
          <Image
            src={RichardImage}
            alt="richard mask image"
            name="character-wrapper__header-mask"
          />
          <figcaption className="character-wrapper__character-name_header">
            Richard
          </figcaption>
        </figure>
      </section>
      {children}
    </header>
  );
};

export default Header;
