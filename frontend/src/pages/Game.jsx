import React, { useEffect, useState } from "react";
import "../styles/pages/Game.css";
import { getRoomDetails, deleteRoom, distributeCards } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Card from "../components/game/Card";
import socket from "../socket";
import CardBack from "../components/game/CardBack";

const Game = ({ roomId, setActiveTab }) => {
  const { user } = useAuth();

  const [players, setPlayers] = useState([]); // ✅ FIX: missing state
  const [admin, setAdmin] = useState("");
  const [hands, setHands] = useState({});

  const myHand = hands[user.username] || [];

  // 🔁 rotate players so current user is always bottom
  const rotatePlayers = (players, currentUsername) => {
    const myIndex = players.indexOf(currentUsername);
    if (myIndex === -1) return players;

    return [
      ...players.slice(myIndex + 1),
      ...players.slice(0, myIndex + 1),
    ];
  };

  const rotatedPlayers = rotatePlayers(players, user.username);

  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const data = await getRoomDetails(roomId);
        setPlayers(data.users);
        setAdmin(data.admin);
        setHands(data.hands || {});
        localStorage.setItem("players", JSON.stringify(data.users));
      } catch (err) {
        alert("Game ended");
        localStorage.removeItem("roomId");
        localStorage.removeItem("players");
        setActiveTab(0);
      }
    };

    fetchRoom();

    socket.connect();
    socket.emit("join-room", roomId);

    socket.on("cards-distributed", (data) => {
      setHands(data.hands);
    });

    return () => {
      socket.off("cards-distributed");
    };
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

  const handleDistribute = async () => {
    try {
      await distributeCards(roomId);
    } catch (err) {
      alert(err.message);
    }
  };

  if (players.length !== 4) {
    return <div className="game-loading">Loading game...</div>;
  }

  return (
    <div className="game-table">
      {/* ADMIN CONTROLS */}
      {user.username === admin && (
        <>
          <button className="exit-game" onClick={handleExitGame}>
            Exit Game
          </button>
          <button
            style={{ position: "absolute", top: "10px", right: "120px" }}
            onClick={handleDistribute}
          >
            Distribute Cards
          </button>
        </>
      )}

      {/* TOP */}
      <div className="player top">
        <div className="name">{rotatedPlayers[1]}</div>
        <div className="cards horizontal">
          {(hands[rotatedPlayers[1]] || []).map((c, i) => (
            <CardBack key={i}/>
          ))}
        </div>
      </div>

      {/* LEFT */}
      <div className="player left">
        <div className="name">{rotatedPlayers[0]}</div>
        <div className="cards vertical">
          {(hands[rotatedPlayers[0]] || []).map((c, i) => (
            <CardBack key={i}/>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="player right">
        <div className="name">{rotatedPlayers[2]}</div>
        <div className="cards vertical">
          {(hands[rotatedPlayers[2]] || []).map((c, i) => (
            <CardBack key={i} />
          ))}
        </div>
      </div>

      {/* BOTTOM (ME) */}
      <div className="player bottom">
        <div className="cards horizontal">
          {myHand.map((c, i) => (
            <Card key={i} num={c} />
          ))}
        </div>
        <div className="name">{rotatedPlayers[3]}</div>
      </div>
    </div>
  );
};

export default Game;
