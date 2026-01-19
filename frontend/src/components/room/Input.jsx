import React from "react";
import "../../styles/components/room/Input.css";

const Input = ({ placeholder }) => {
  return (
    <div className="room-input">
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default Input;
