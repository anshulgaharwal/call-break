//src/components/auth/Crad.jsx
import React, { useState } from "react";
import "../../styles/components/Card.css";
import AuthToggle from "./AuthToggle";
import { KeyRound, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

 
const Card = () => {
  const [mode, setMode] = useState("signup");
  return (
    <motion.div layout className="card-container">
      <div className="contain">
        <div className="toggle">
          <AuthToggle mode={mode} setMode={setMode} />
        </div>
        <div className="header">
          <p>{mode === "signup" ? "Create an account" : "Welcome Back"}</p>
        </div>
        <div className="input-container">
          {mode === "signup" && (
            <div className="input-wrap">
              <span className="input-icon">
                <User color="white" size={28} />
              </span>
              <input
                className="input-field"
                type="text"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="input-wrap">
            <span className="input-icon">
              <Mail color="white" size={28} />
            </span>
            <input
              className="input-field"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-wrap">
            <span className="input-icon">
              <KeyRound color="white" size={28} />
            </span>
            <input
              className="input-field"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="submit">
          <button>{mode === "signup" ? "Create Account" : "Sign In"}</button>
        </div>
        <div className="part">
          <div className="line"></div>
          <div className="or">OR</div>
          <div className="line"></div>
        </div>
        <div className="options">
          <button>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="google-icon"
            />
          </button>
          <button>
            <img
              width={22}
              src="https://img.icons8.com/ios-filled/50/228BE6/phone.png"
              alt="phone"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
