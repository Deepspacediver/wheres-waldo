import React, { useState } from "react";
import TaggingHandler from "../TaggingHandler/TaggingHandler";
import Overlay from "../Overlay/Overlay";
import GameStartModal from "../GameStartModal/GameStartModal";
import "./GameContainer.styles.css";

const GameContainer = () => {
  const [canStartGame, setCanStartGame] = useState(false);

  const StartPhaseElements = (
    <Overlay>
      <GameStartModal setCanStartGame={setCanStartGame} />
    </Overlay>
  );

  return (
    <div>
      {!canStartGame && StartPhaseElements}
      <TaggingHandler canStartGame={canStartGame} />
    </div>
  );
};

export default GameContainer;
