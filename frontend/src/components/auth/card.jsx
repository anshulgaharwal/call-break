//src/components/auth/Crad.jsx
import React, { useState } from "react";
import "../../styles/components/Card.css";
import AuthToggle from "./AuthToggle";

const Card = () => {
  const [mode, setMode] = useState("signup");
  return (
    <div className="card-container">
      <div className="contain">
        <div className="toggle">
          <AuthToggle mode={mode} setMode={setMode}/>
        </div>
        <div className="header">Header</div>
        <div className="input-container">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
        <div className="submit">
          <button>Create Account</button>
        </div>
        <div className="part">OR</div>
        <div className="options">
          <button>Google</button>
          <button>Phone</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
