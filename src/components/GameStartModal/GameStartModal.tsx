import React, { Dispatch, SetStateAction } from "react";
import Image from "../Image/Image";
import HelmetImage from "../../assets/images/masks/helmet-mask.webp";
import RasmusImage from "../../assets/images/masks/rasmus-mask.webp";
import RichardImage from "../../assets/images/masks/richard-mask.webp";
import HotlineTitle from "../../assets/images/hotline-miami-title.webp";
import "./GameStartModal.styles.css";

interface GameStartModalProps {
  setCanStartGame: Dispatch<SetStateAction<boolean>>;
}

const GameStartModal = ({ setCanStartGame }: GameStartModalProps) => {
  return (
    <div className="game-start-modal">
      <figure className="game-start-modal__title-wrapper">
        <Image
          src={HotlineTitle}
          alt="hotline miami title"
          name="hotline-miami-title"
        />
      </figure>
      <section className="game-start-modal__instructions">
        <p className="game-start-modal__para">
          Welcome to the Hotline Miami themed game of Where's Waldo!
        </p>
        <p className="game-start-modal__para">
          The goal of the game is to find 3 characters represented below.
        </p>
        <p className="game-start-modal__para">
          Once you start the game you will be timed.
        </p>
        <p className="game-start-modal__para">
          Find every character and submit your score.
        </p>
      </section>
      <section className="game-start-modal__characters">
        <figure className="character-wrapper character-wrapper_modal">
          <Image
            src={HelmetImage}
            alt="helmet mask image"
            name="character-wrapper__modal-mask"
          />
          <figcaption className="character-wrapper__character-name character-wrapper__character-name_modal">
            Helmet
          </figcaption>
        </figure>
        <figure className="character-wrapper character-wrapper_modal">
          <Image
            src={RasmusImage}
            alt="rasmus mask image"
            name="character-wrapper__modal-mask"
          />
          <figcaption className="character-wrapper__character-name character-wrapper__character-name_modal">
            Rasmus
          </figcaption>
        </figure>
        <figure className="character-wrapper character-wrapper_modal">
          <Image
            src={RichardImage}
            alt="richard mask image"
            name="character-wrapper__modal-mask"
          />
          <figcaption className="character-wrapper__character-name character-wrapper__character-name_modal">
            Richard
          </figcaption>
        </figure>
      </section>

      <button
        className="btn btn_start-game"
        onClick={() => setCanStartGame(true)}
      >
        Start
      </button>
    </div>
  );
};

export default GameStartModal;
