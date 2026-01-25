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
      exists = await Room.exists({ id: roomId });
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
      room: {
        roomId: room.id,
        isPrivate,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create room" });
  }
};

export const join = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await Room.findOne({ id: roomId });
    console.log(room);

    if (!room) {
      return res.status(401).json({
        message: "No room exist with this Id",
      });
    }

    if (room.password) {
      return res.status(200).json({
        requiredPassword: true,
        roomId: room.id,
      });
    }

    return res.status(200).json({
      requiredPassword: false,
      roomId: room.id,
    });
  } catch (err) {}
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const username = req.user.username;

    const room = await Room.findOne({ id: roomId });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    if (room.admin === username) {
      await Room.deleteOne({ id: roomId });

      return res.status(200).json({
        message: "Room deleted because admin left",
      });
    }

    return res.status(200).json({
      message: "User left room",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to leave room",
    });
  }
};

export const getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ id: roomId });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.status(200).json({
      roomId: room.id,
      admin: room.admin,
      users: room.users,
      maxPlayers: 4,
      currentPlayers: room.users.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch room details",
    });
  }
};

export const verifyPassword = async (req, res) => {
  try {
    const { roomId, password } = req.body;
    const username = req.user.username;

    const room = await Room.findOne({ id: roomId });

    const isMatch = await bcrypt.compare(password, room.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    if (!room.users.includes(username)) {
      room.users.push(username);
      await room.save();
    }

    res.status(200).json({
      message: "Password verified",
      roomId: room.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to verify password" });
  }
};
