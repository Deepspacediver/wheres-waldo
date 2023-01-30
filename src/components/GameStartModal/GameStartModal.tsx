import React, { Dispatch, SetStateAction } from "react";
import Overlay from "../Overlay/Overlay";
import ModalPopup from "../ModalPopup/ModalPopup";
import "./GameStartModal.styles.css";

interface GameStartModalProps {
  setCanStartGame: Dispatch<SetStateAction<boolean>>;
}

const GameStartModal = ({ setCanStartGame }: GameStartModalProps) => {
  return (
    <ModalPopup>
      <button onClick={() => setCanStartGame(true)}>Start</button>
    </ModalPopup>
  );
};

export default GameStartModal;
