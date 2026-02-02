import React, { useEffect, useState } from "react";
import "../styles/pages/Game.css";
import { getRoomDetails, deleteRoom } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Card from "../components/game/Card";

const Game = ({ roomId, setActiveTab }) => {
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  const [admin, setAdmin] = useState("");

  // dummy 13 cards
  const dummyHand = Array.from({ length: 13 }, (_, i) => i);

  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const data = await getRoomDetails(roomId);
        setPlayers(data.users);
        setAdmin(data.admin);
        localStorage.setItem("players", JSON.stringify(data.users));
      } catch (err) {
        alert("Game ended");
        localStorage.removeItem("roomId");
        localStorage.removeItem("players");
        setActiveTab(0);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleExitGame = async () => {
    try {
      await deleteRoom(roomId);
      localStorage.removeItem("roomId");
      localStorage.removeItem("players");
      setActiveTab(0);
    } catch (err) {
      alert(err.message);
    }
  };

  if (players.length !== 4) {
    return <div className="game-loading">Loading game...</div>;
  }

  return (
    <div className="game-table">
      {user.username === admin && (
        <button className="exit-game" onClick={handleExitGame}>
          Exit Game
        </button>
      )}

      {/* TOP */}
      <div className="player top">
        <div className="name">{players[1]}</div>
        <div className="cards horizontal">
          {dummyHand.map((c, i) => (
            <Card key={i} num={c} />
          ))}
        </div>
      </div>

      {/* LEFT */}
      <div className="player left">
        <div className="name">{players[0]}</div>
        <div className="cards vertical">
          {dummyHand.map((c, i) => (
            <Card key={i} num={c} />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="player right">
        <div className="name">{players[2]}</div>
        <div className="cards vertical">
          {dummyHand.map((c, i) => (
            <Card key={i} num={c} />
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="player bottom">
        <div className="cards horizontal">
          {dummyHand.map((c, i) => (
            <Card key={i} num={c} />
          ))}
        </div>
        <div className="name">{players[3]}</div>
      </div>
    </div>
  );
};

export default Game;
