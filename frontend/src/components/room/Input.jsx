import React from "react";
import "../../styles/components/room/Input.css";

const Input = ({ placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="room-input">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
