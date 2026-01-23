//Room.jsx
import React, { useState } from "react";
import Input from "../room/input";
import { Divide } from "lucide-react";
import Button from "../common/Button";
import "../../styles/components/home/room.css";
import { create, join } from "../../services/api";

const Room = ({ type, setActiveTab, setCurrRoomId }) => {
  const [formData, setFormData] = useState({
    roomId: "",
    password: "",
  });
  const handleSubmit = async () => {
    if (type === "create") {

      const data = await create(formData.password);
      console.log("Room created:", data.room.roomId);
      localStorage.setItem("roomId", data.room.roomId); 
      setCurrRoomId(data.room.roomId);
      setActiveTab(4);
    } else {
      await join(formData.roomId);
    }
  };
  return (
    <div className="room-container">
      <div className="header-room">
        <h2>{type === "create" ? "Create Room" : "Join Room"}</h2>
      </div>
      <div className="input-field-room">
        {type === "create" && (
          <>
            <Input
              placeholder="Set room password (optional)"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
            <Button onClick={handleSubmit}>Create Room</Button>
          </>
        )}
        {type === "join" && (
          <>
            <Input
              placeholder="Enter Room ID"
              value={formData.roomId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  roomId: e.target.value,
                })
              }
            />
            <Button onClick={handleSubmit}>Join Room</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Room;
