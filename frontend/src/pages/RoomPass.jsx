import React, { useState } from "react";
import Input from "../components/room/input";
import "../styles/pages/RoomPass.css";
import Button from "../components/common/Button";
import { verifyRoomPassword } from "../services/api";

const RoomPass = ({ setActiveTab, setCurrRoomId }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const roomId = localStorage.getItem("roomId");

      await verifyRoomPassword(roomId, password);

      setCurrRoomId(roomId);
      setActiveTab(4); // Lobby
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="pass-contain">
      <div>
        <Button onClick={() => setActiveTab(0)}>Previous page</Button>
      </div>
      <div className="main-pass">
        <div className="header">Enter Password</div>
        <div>
          <Input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>Continue</Button>
        <div className="info">
          <p>
            This room is protected by password. Please enter password to enter
            the room
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomPass;
