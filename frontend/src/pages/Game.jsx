import React, { useEffect, useState } from "react";
import "../styles/pages/Game.css";
import { getRoomDetails, deleteRoom } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Game = ({ roomId, setActiveTab }) => {
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  const [admin, setAdmin] = useState("");

  // fetch room on load + refresh
  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const data = await getRoomDetails(roomId);
        setPlayers(data.users);
        setAdmin(data.admin);
        localStorage.setItem("players", JSON.stringify(data.users));
      } catch (err) {
        // room deleted by admin
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

      <div className="top">{players[1]}</div>
      <div className="left">{players[0]}</div>
      <div className="right">{players[2]}</div>
      <div className="bottom">{players[3]}</div>
    </div>
  );
};

export default Game;
