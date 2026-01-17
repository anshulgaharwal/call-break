import { motion } from "framer-motion";
import "./AuthToggle.css";

export default function AuthToggle({ mode, setMode }) {
  return (
    <div className="toggle-wrapper">
      <motion.div
        className="toggle-active"
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 40,
        }}
        style={{
          left: mode === "signup" ? "4px" : "50%",
        }}
      />

      <button
        className={`toggle-btn ${mode === "signup" ? "active" : ""}`}
        onClick={() => setMode("signup")}
      >
        Sign up
      </button>

      <button
        className={`toggle-btn ${mode === "signin" ? "active" : ""}`}
        onClick={() => setMode("signin")}
      >
        Sign in
      </button>
    </div>
  );
}
