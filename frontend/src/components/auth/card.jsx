//src/components/auth/Crad.jsx
import React, { useState } from "react";
import "../../styles/components/Card.css";
import AuthToggle from "./AuthToggle";
import { KeyRound, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
const Card = () => {
  const [mode, setMode] = useState("signin");
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const { login, register, loading, error } = useAuth();

  const handleSubmit = async () => {
      if (mode === "signup") {
        await register(formData.name, formData.userName, formData.email, formData.password);
      }
      if (mode === "signin") {
        await login(formData.email, formData.password);
      }
  };
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
            <>
              <div className="input-wrap">
                <span className="input-icon">
                  <User color="white" size={28} />
                </span>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-wrap">
                <span className="input-icon">
                  <User color="white" size={28} />
                </span>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Create a unique ID"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      userName: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}
          <div className="input-wrap">
            <span className="input-icon">
              <Mail color="white" size={28} />
            </span>
            <input
              className="input-field"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
        {error && (
          <p
            style={{ color: "#ff6b6b", marginTop: "10px", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        <div className="submit">
          <button onClick={handleSubmit} disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "signup"
                ? "Create Account"
                : "Sign In"}
          </button>
        </div>
        {/* <div className="part">
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
        </div> */}
      </div>
    </motion.div>
  );
};

export default Card;
