import React, { useEffect, useState } from "react";
import "../styles/pages/Game.css";
import { deleteRoom, getRoomDetails, nextRound, playCard, submitBid } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Card from "../components/game/Card";
import CardBack from "../components/game/CardBack";
import BidSelector from "../components/game/BidSelector";
import Scoreboard from "../components/game/Scoreboard";
import socket from "../socket";
import { PHASE_LABELS } from "../utils/constants";
import { getCurrentPlayer, getPlayerMapFromPerspective } from "../utils/gameHelpers";

const initialGameState = {
  admin: "",
  users: [],
  hands: {},
  bids: {},
  tricksWon: {},
  scores: {},
  turnIndex: 0,
  centerPile: [],
  phase: "lobby",
  roundNumber: 0,
  totalRounds: 5,
  completedTricksInRound: 0,
  latestRoundSummary: [],
  winner: [],
  lastTrickWinner: "",
};

const Game = ({ roomId, setActiveTab }) => {
  const { user } = useAuth();
  const [gameState, setGameState] = useState(initialGameState);
  const [actionError, setActionError] = useState("");
  const [pendingAction, setPendingAction] = useState(false);

  const players = gameState.users;
  const playerMap = getPlayerMapFromPerspective(players, user.username);
  const myHand = gameState.hands[user.username] || [];
  const currentTurnPlayer = getCurrentPlayer(players, gameState.turnIndex);
  const isMyTurn = currentTurnPlayer === user.username;
  const myBidPlaced = typeof gameState.bids[user.username] === "number";

  const phaseMessage =
    (gameState.phase === "bidding" && `Waiting on bid from ${currentTurnPlayer}`) ||
    (gameState.phase === "playing" &&
      `${currentTurnPlayer}'s turn | Trick ${gameState.completedTricksInRound + 1} of 13`) ||
    (gameState.phase === "roundComplete" &&
      `Round finished. Last trick winner: ${gameState.lastTrickWinner || "-"}`) ||
    (gameState.phase === "gameComplete" &&
      `Winner${gameState.winner.length > 1 ? "s" : ""}: ${gameState.winner.join(", ")}`) ||
    "Waiting for players";

  const refreshRoom = async () => {
    try {
      const data = await getRoomDetails(roomId);
      setGameState((prev) => ({ ...prev, ...data }));
      setActionError("");
    } catch (err) {
      alert(err.message || "Game ended");
      localStorage.clear();
      setActiveTab(0);
    }
  };

  useEffect(() => {
    if (!roomId) {
      return undefined;
    }

    refreshRoom();

    socket.connect();
    socket.emit("join-room", roomId);

    const handleRoomState = (data) => {
      setGameState((prev) => ({ ...prev, ...data }));
      setPendingAction(false);
      setActionError("");
    };

    socket.on("room-state", handleRoomState);

    return () => {
      socket.off("room-state", handleRoomState);
      socket.disconnect();
    };
  }, [roomId]);

  const handleExitGame = async () => {
    try {
      await deleteRoom(roomId);
      localStorage.clear();
      setActiveTab(0);
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleBidSubmit = async (bid) => {
    try {
      setPendingAction(true);
      setActionError("");
      const data = await submitBid(roomId, bid);
      setGameState((prev) => ({ ...prev, ...data.room }));
      setPendingAction(false);
    } catch (err) {
      setPendingAction(false);
      setActionError(err.message);
    }
  };

  const handlePlayCard = async (card) => {
    try {
      if (!isMyTurn || pendingAction) {
        return;
      }

      setPendingAction(true);
      setActionError("");
      const data = await playCard(roomId, card);
      setGameState((prev) => ({ ...prev, ...data.room }));
      setPendingAction(false);
    } catch (err) {
      setPendingAction(false);
      setActionError(err.message);
    }
  };

  const handleNextRound = async () => {
    try {
      setPendingAction(true);
      setActionError("");
      const data = await nextRound(roomId);
      setGameState((prev) => ({ ...prev, ...data.room }));
      setPendingAction(false);
    } catch (err) {
      setPendingAction(false);
      setActionError(err.message);
    }
  };

  if (players.length !== 4) {
    return <div className="game-loading">Loading game...</div>;
  }

  return (
    <div className="game-table">
      <div className="game-shell">
        <div className="game-header-panel">
          <div className="game-header-copy">
            <div className="status-chip">{PHASE_LABELS[gameState.phase]}</div>
            <h2>
              Round {gameState.roundNumber} / {gameState.totalRounds}
            </h2>
            <p>{phaseMessage}</p>
          </div>
          <div className="game-header-actions">
            <button className="game-action-button danger" onClick={handleExitGame}>
              Exit Game
            </button>
            {gameState.phase === "roundComplete" && user.username === gameState.admin && (
              <button
                className="game-action-button"
                disabled={pendingAction}
                onClick={handleNextRound}
              >
                Start Next Round
              </button>
            )}
          </div>
        </div>

        <div className="game-content">
          <aside className="game-sidebar game-sidebar-left">
            <Scoreboard
              players={players}
              bids={gameState.bids}
              tricksWon={gameState.tricksWon}
              scores={gameState.scores}
              roundSummary={gameState.latestRoundSummary}
            />
          </aside>

          <section className="game-arena-section">
            {actionError && <div className="game-error-banner">{actionError}</div>}

            {gameState.phase === "bidding" && isMyTurn && !myBidPlaced && (
              <BidSelector disabled={pendingAction} onSubmit={handleBidSubmit} />
            )}

            <div className="game-arena">
              <div className="arena-ring" />

              <div className="player top">
                <div
                  className={`name ${currentTurnPlayer === playerMap.top ? "active-turn" : ""}`}
                >
                  {playerMap.top}
                  {typeof gameState.bids[playerMap.top] === "number" &&
                    ` | bid ${gameState.bids[playerMap.top]}`}
                </div>
                <div className="cards horizontal">
                  {(gameState.hands[playerMap.top] || []).map((_, index) => (
                    <CardBack key={`${playerMap.top}-${index}`} />
                  ))}
                </div>
              </div>

              <div className="player left">
                <div
                  className={`name ${currentTurnPlayer === playerMap.left ? "active-turn" : ""}`}
                >
                  {playerMap.left}
                  {typeof gameState.bids[playerMap.left] === "number" &&
                    ` | bid ${gameState.bids[playerMap.left]}`}
                </div>
                <div className="cards vertical">
                  {(gameState.hands[playerMap.left] || []).map((_, index) => (
                    <CardBack key={`${playerMap.left}-${index}`} />
                  ))}
                </div>
              </div>

              <div className="player right">
                <div
                  className={`name ${currentTurnPlayer === playerMap.right ? "active-turn" : ""}`}
                >
                  {playerMap.right}
                  {typeof gameState.bids[playerMap.right] === "number" &&
                    ` | bid ${gameState.bids[playerMap.right]}`}
                </div>
                <div className="cards vertical">
                  {(gameState.hands[playerMap.right] || []).map((_, index) => (
                    <CardBack key={`${playerMap.right}-${index}`} />
                  ))}
                </div>
              </div>

              <div className="center-pile">
                {gameState.centerPile.map((play) => (
                  <div key={`${play.username}-${play.card}`} className="center-card-wrap">
                    <Card num={play.card} />
                    <span>{play.username}</span>
                  </div>
                ))}
              </div>

              <div className="player bottom">
                <div className="bottom-player-meta">
                  <div className={`name ${isMyTurn ? "active-turn" : ""}`}>
                    {playerMap.bottom}
                    {typeof gameState.bids[playerMap.bottom] === "number" &&
                      ` | bid ${gameState.bids[playerMap.bottom]}`}
                  </div>
                  <div className="bottom-player-note">
                    {isMyTurn ? "Your move" : `${currentTurnPlayer} is playing`}
                  </div>
                </div>
                <div className="cards horizontal my-hand">
                  {myHand.map((card) => {
                    const disabled =
                      gameState.phase !== "playing" || !isMyTurn || pendingAction;

                    return (
                      <button
                        key={`${user.username}-${card}`}
                        className="playable-card"
                        disabled={disabled}
                        onClick={() => handlePlayCard(card)}
                      >
                        <Card num={card} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <aside className="game-sidebar game-sidebar-right">
            <div className="game-info-card">
              <div className="round-summary-title">Table Status</div>
              <div className="info-row">
                <span>Current turn</span>
                <strong>{currentTurnPlayer}</strong>
              </div>
              <div className="info-row">
                <span>Tricks played</span>
                <strong>{gameState.completedTricksInRound} / 13</strong>
              </div>
              <div className="info-row">
                <span>Cards in center</span>
                <strong>{gameState.centerPile.length}</strong>
              </div>
              <div className="info-row">
                <span>Last trick winner</span>
                <strong>{gameState.lastTrickWinner || "-"}</strong>
              </div>
            </div>

            {(gameState.phase === "roundComplete" || gameState.phase === "gameComplete") &&
              gameState.latestRoundSummary.length > 0 && (
                <div className="round-summary-card">
                  <div className="round-summary-title">
                    {gameState.phase === "gameComplete" ? "Final Round Summary" : "Round Summary"}
                  </div>
                  {gameState.latestRoundSummary.map((item) => (
                    <div key={item.username} className="round-summary-row">
                      <span>{item.username}</span>
                      <span>Bid {item.bid}</span>
                      <span>Tricks {item.tricks}</span>
                      <span>Round {item.roundScore}</span>
                      <span>Total {item.totalScore}</span>
                    </div>
                  ))}
                </div>
              )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Game;
