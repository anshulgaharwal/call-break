import React from "react";
import "../styles/pages/Game.css";

const Game = ({ roomId }) => {
  const players = JSON.parse(localStorage.getItem("players")) || [];

  return (
    <div className="game-table">
      <div className="top">{players[1]}</div>
      <div className="left">{players[0]}</div>
      <div className="right">{players[2]}</div>
      <div className="bottom">{players[3]}</div>
    </div>
  );
};

export default Game;
