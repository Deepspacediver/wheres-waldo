import React, { useEffect, useState } from "react";
import "./Scoreboard.styles.css";
import { db } from "../../firebase/firebase-config";
import { query, collection, limit, orderBy, getDocs } from "firebase/firestore";
import type { PlayerList, Player } from "../../common/types";
import PlayerScore from "../PlayerScore/PlayerScore";

const Scoreboard = () => {
  const [topPlayers, setTopPlayers] = useState<PlayerList>([]);

  useEffect(() => {
    let mounted = true;
    const getBestPlayers = async () => {
      if (!mounted) return;
      try {
        const playersQuery = query(
          collection(db, "players"),
          orderBy("time", "asc"),
          limit(5)
        );
        const querySnap = await getDocs(playersQuery);
        const res: PlayerList = [];
        querySnap.forEach((player) => {
          const x = player.data() as Player;
          res.push(x);
        });
        setTopPlayers(res);
      } catch (err) {
        console.error("Failed to get Scoreboard of top 5 players", err);
      }
    };
    getBestPlayers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <ul onClick={() => console.log(topPlayers)}>
        {topPlayers.length &&
          topPlayers.map(({ name, time }, i) => (
            <li key={i}>
              <PlayerScore name={name} time={time} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
