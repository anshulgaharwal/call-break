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
    const { name, username, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // const userExits = await User.findOne({ email });
    // if (userExits) {
    //   return res.status(409).json({
    //     message: "User already exits, Sign in instead",
    //   });
    // }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Sign up failed, try again later",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "User not find, try Sign up",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password, try again",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        id: user,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sign in failed" });
  }
};
