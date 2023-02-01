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
      <figure className="game-start-modal_title-wrapper">
        <Image
          src={HotlineTitle}
          alt="hotline miami title"
          name="hotline-miami-title"
        />
      </figure>
      <section className="game-start-modal_instructions">
        <p className="game-start-modal_para font-shadow__small">
          Welcome to the Hotline Miami themed game of Where's Waldo.
        </p>
        <p className="game-start-modal_para font-shadow__small">
          The goal of the game is to find 3 characters represented below.
        </p>
        <p className="game-start-modal_para font-shadow__small">
          Once you start the game you will be timed.{" "}
        </p>
        <p className="game-start-modal_para font-shadow__small">
          Find all the characters and submit your score.
        </p>
      </section>
      <section className="game-start-modal_characters">
        <figure className="game-start-modal_character-wrapper">
          <Image
            src={HelmetImage}
            alt="helmet mask image"
            name="game-start-modal_modal-mask"
          />
          <figcaption className="font-shadow__small game-start-modal_character-name">
            Helmet
          </figcaption>
        </figure>
        <figure className="game-start-modal_character-wrapper">
          <Image
            src={RasmusImage}
            alt="rasmus mask image"
            name="game-start-modal_modal-mask"
          />
          <figcaption className="font-shadow__small game-start-modal_character-name">
            Rasmus
          </figcaption>
        </figure>
        <figure className="game-start-modal_character-wrapper">
          <Image
            src={RichardImage}
            alt="richard mask image"
            name="game-start-modal_modal-mask"
          />
          <figcaption className="font-shadow__small game-start-modal_character-name">
            Richard
          </figcaption>
        </figure>
      </section>

      <button
        className="btn btn__start-game"
        onClick={() => setCanStartGame(true)}
      >
        Start
      </button>
    </div>
  );
};

export default GameStartModal;
