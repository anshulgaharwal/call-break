// TODO: Room controller logic
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Room from "../models/Room.js";
import crypto from "crypto";

const generateRoomId = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};

export const create = async (req, res) => {
  try {
    const { password } = req.body;
    const userName = req.user.username;
    let roomId;
    let exists = true;

    while (exists) {
      roomId = generateRoomId();
      exists = await Room.exists({ roomId });
    }

    let hashedPassword = null;
    let isPrivate = false;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      isPrivate = true;
    }

    const room = await Room.create({
      id: roomId,
      password: hashedPassword,
      users: [userName],
      admin: userName,
    });

    res.status(201).json({
        message: "Room created",
        token,
        room: {
            roomId: room.roomId,
            isPrivate: 
        }
    })
  } catch (err) {}
};

export const join = async (req, res) => {
  try {
  } catch (err) {}
};
