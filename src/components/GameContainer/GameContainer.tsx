import React, { useState, useEffect, useRef } from "react";
import TaggingHandler from "../TaggingHandler/TaggingHandler";
import Overlay from "../Overlay/Overlay";
import GameStartModal from "../GameStartModal/GameStartModal";
import { CSSTransition } from "react-transition-group";
import "./GameContainer.styles.css";

const GameContainer = () => {
  const [canStartGame, setCanStartGame] = useState(false);
  const startModalNodeRef = useRef<HTMLDivElement | null>(null);

  const startPhaseElements = (
    <Overlay ref={startModalNodeRef}>
      <GameStartModal setCanStartGame={setCanStartGame} />
    </Overlay>
  );

  return (
    <>
      <CSSTransition
        in={!canStartGame}
        timeout={400}
        unmountOnExit
        classNames="overlay"
        nodeRef={startModalNodeRef}
        appear
      >
        {startPhaseElements}
      </CSSTransition>
      <TaggingHandler canStartGame={canStartGame} />
    </>
  );
};

export default GameContainer;
