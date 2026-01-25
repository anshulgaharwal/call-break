import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import { deleteRoom, getRoomDetails } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx"
import "../styles/pages/Lobby.css";

const Lobby = ({ setActiveTab, roomId }) => {
  const { user } = useAuth();
  
  const [players, setPlayers] = useState([]);
  const [admin, setAdmin] = useState("");

  const handlePrev = async () => {
    try {
      if (user.username === admin) {
        const data = await deleteRoom(roomId);
        console.log(data.message);
      }
      localStorage.removeItem("roomId");
      setActiveTab(0);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const data = await getRoomDetails(roomId);
        setPlayers(data.users);
        setAdmin(data.admin);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchRoom();
  }, [roomId]);

  return (
    <div className="lobby-main">
      <div>
        <Button onClick={handlePrev}>Previous page</Button>
      </div>
      <div>
        <h2>Game is about to start</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player}
              {player === admin && " (Admin)"}
            </li>
          ))}
        </ul>

        {players.length < 4 && <p>Waiting for players...</p>}
        {players.length === 4 && <p>Room is full</p>}
      </div>
      <div></div>
    </div>
  );
};

export default Lobby;
