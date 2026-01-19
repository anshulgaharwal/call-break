//Room.jsx
import React from "react";
import Input from "../room/input";
import { Divide } from "lucide-react";
import Button from "../common/Button";
import "../../styles/components/home/room.css";

const Room = ({ type, setActiveTab }) => {
  return (
    <div className="room-container">
      <div className="header-room">
        <h2>{type === "create" ? "Create Room" : "Join Room"}</h2>
      </div>
      <div className="input-field-room">
        {type === "create" && (
          <>
            <Input placeholder="Set room password (optional)" />
            <Button onClick={() => setActiveTab(4)}>Create Room</Button>
          </>
        )}
        {type === "join" && (
          <>
            <Input placeholder="Enter Room ID" />
            <Button onClick={() => setActiveTab(3)}>Join Room</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Room;
