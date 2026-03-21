import React from "react";

const Scoreboard = ({
  players = [],
  bids = {},
  tricksWon = {},
  scores = {},
  roundSummary = [],
}) => {
  const summaryMap = roundSummary.reduce((acc, item) => {
    acc[item.username] = item;
    return acc;
  }, {});

  return (
    <div className="scoreboard">
      <div className="scoreboard-title">Scoreboard</div>
      <div className="scoreboard-grid scoreboard-header">
        <span>Player</span>
        <span>Bid</span>
        <span>Tricks</span>
        <span>Round</span>
        <span>Total</span>
      </div>
      {players.map((player) => {
        const summary = summaryMap[player];

        return (
          <div key={player} className="scoreboard-grid">
            <span>{player}</span>
            <span>{bids[player] ?? "-"}</span>
            <span>{tricksWon[player] ?? 0}</span>
            <span>{summary ? summary.roundScore : "-"}</span>
            <span>{scores[player] ?? 0}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Scoreboard;
