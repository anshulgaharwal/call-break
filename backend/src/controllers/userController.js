import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Register a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(409).json({
        message: "User already exits, Sign in instead",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Sign up failed, try again later",
    });
  }
};

export const login = async (req, res) => {};
