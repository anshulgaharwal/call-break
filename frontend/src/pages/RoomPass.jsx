import React from "react";
import Input from "../components/room/input";
import "../styles/pages/RoomPass.css";
import Button from "../components/common/Button";

const RoomPass = ({setActiveTab}) => {
  return (
    <div className="pass-contain">
      <div>
        <Button onClick={() => setActiveTab(0)}>Previous page</Button>
      </div>
      <div className="main-pass">
        <div className="header">Enter Password</div>
        <div>
          <Input placeholder="password" />
        </div>
        <Button onClick={() => setActiveTab(4)}>continue</Button>
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
