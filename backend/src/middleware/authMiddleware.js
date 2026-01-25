import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = {
      username: decoded.username,
      email: decoded.email,
    };
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message || "hoho" });
  }
};
