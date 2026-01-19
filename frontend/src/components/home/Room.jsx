import React from "react";
import Input from "../room/input";
import { Divide } from "lucide-react";
import Button from "../common/Button";

const Room = ({ type }) => {
  return (
    <div>
      <div className="header-room">
        <h2>{type === "create" ? "Create Room" : "Join Room"}</h2>
      </div>
      {type === "create" && (
        <div className="create-room">
          <Input placeholder="Set room password (optional)" />
          <Button>Create Room</Button>
        </div>
      )}
      {type === "join" && (
        <div className="join-room">
          <Input placeholder="Enter Room ID" />
          <Button>Join Room</Button>
        </div>
      )}
    </div>
  );
};

export default Room;
