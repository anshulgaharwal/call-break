// TODO: Game controller logic
import Room from "../models/Room.js";
import { createDeck, shuffleDeck } from "../utils/deck.js";

export const distributeCards = async (req, res) => {
  try {
    const { roomId } = req.body;
    const username = req.user.username;

    const room = await Room.findOne({ id: roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.admin !== username) {
      return res
        .status(403)
        .json({ message: "Only admin can distribute cards" });
    }

    if (room.users.length !== 4) {
      return res.status(400).json({ message: "Need exactly 4 players" });
    }

    let deck = shuffleDeck(createDeck());

    const hands = {};
    room.users.forEach((user, index) => {
      hands[user] = deck.slice(index * 13, (index + 1) * 13);
    });

    room.hands = hands;
    room.centerPile = []; 
    room.gameStarted = true;
    await room.save();

    const io = req.app.get("io");
    io.to(room.id).emit("cards-distributed", {
      hands,
      centerPile: [],
    });

    res.json({
      success: true,
      hands,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
