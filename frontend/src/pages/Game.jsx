import React, { useEffect, useState, useMemo } from "react";
import "../styles/pages/Game.css";
import { getRoomDetails, deleteRoom, distributeCards } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Card from "../components/game/Card";
import CardBack from "../components/game/CardBack";
import socket from "../socket";

const Game = ({ roomId, setActiveTab }) => {
  const { user } = useAuth();

  const [players, setPlayers] = useState([]);
  const [admin, setAdmin] = useState("");
  const [hands, setHands] = useState({});
  const [turnIndex, setTurnIndex] = useState(0);
  const [centerPile, setCenterPile] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); 

  const myHand = hands[user.username] || [];

  const rotatedPlayers = useMemo(() => {
    const myIndex = players.indexOf(user.username);
    if (myIndex === -1) return players;
    return [
      ...players.slice(myIndex + 1),
      ...players.slice(0, myIndex + 1),
    ];
  }, [players, user.username]);

  const currentTurnPlayer = players[turnIndex];
  const isMyTurn = currentTurnPlayer === user.username;

  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const data = await getRoomDetails(roomId);
        setPlayers(data.users);
        setAdmin(data.admin);
        setHands(data.hands || {});
        setTurnIndex(data.turnIndex ?? 0);
        setCenterPile(data.centerPile || []);
        localStorage.setItem("players", JSON.stringify(data.users));
      } catch {
        alert("Game ended");
        localStorage.clear();
        setActiveTab(0);
      }
    };

    fetchRoom();

    socket.connect();
    socket.emit("join-room", roomId);

    socket.on("cards-distributed", (data) => {
      setHands(data.hands);
      setCenterPile(data.centerPile || []);
      setTurnIndex(data.turnIndex ?? 0);
      setIsPlaying(false);
    });

    socket.on("card-played", (data) => {
      setHands(data.hands);
      setCenterPile(data.centerPile);
      setTurnIndex(data.turnIndex);
      setIsPlaying(false); 
    });

    return () => {
      socket.off("cards-distributed");
      socket.off("card-played");
    };
  }, [roomId]);

  const handleExitGame = async () => {
    try {
      await deleteRoom(roomId);
      localStorage.clear();
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
      {/* CENTER PILE */}
      <div className="center-pile">
        {centerPile.map((play, i) => (
          <Card key={i} num={play.card} />
        ))}
      </div>

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
        <div
          className={`name ${
            currentTurnPlayer === rotatedPlayers[1] ? "active-turn" : ""
          }`}
        >
          {rotatedPlayers[1]}
        </div>
        <div className="cards horizontal">
          {(hands[rotatedPlayers[1]] || []).map((_, i) => (
            <CardBack key={i} />
          ))}
        </div>
      </div>

      {/* LEFT */}
      <div className="player left">
        <div
          className={`name ${
            currentTurnPlayer === rotatedPlayers[0] ? "active-turn" : ""
          }`}
        >
          {rotatedPlayers[0]}
        </div>
        <div className="cards vertical">
          {(hands[rotatedPlayers[0]] || []).map((_, i) => (
            <CardBack key={i} />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="player right">
        <div
          className={`name ${
            currentTurnPlayer === rotatedPlayers[2] ? "active-turn" : ""
          }`}
        >
          {rotatedPlayers[2]}
        </div>
        <div className="cards vertical">
          {(hands[rotatedPlayers[2]] || []).map((_, i) => (
            <CardBack key={i} />
          ))}
        </div>
      </div>

      {/* BOTTOM (ME) */}
      <div className="player bottom">
        <div className="cards horizontal">
          {myHand.map((c, i) => (
            <div
              key={i}
              onClick={() => {
                if (!isMyTurn || isPlaying) return;
                setIsPlaying(true);
                socket.emit("play-card", {
                  roomId,
                  username: user.username,
                  card: c,
                });
              }}
              style={{
                cursor: isMyTurn ? "pointer" : "not-allowed",
                opacity: isMyTurn ? 1 : 0.5,
              }}
            >
              <Card num={c} />
            </div>
          ))}
        </div>
        <div className={`name ${isMyTurn ? "active-turn" : ""}`}>
          {rotatedPlayers[3]}
        </div>
      </div>
    </div>
  );
};

export default Game;
