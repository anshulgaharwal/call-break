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
    room.turnIndex = 0;
    room.gameStarted = true;
    await room.save();

    const io = req.app.get("io");
    io.to(room.id).emit("cards-distributed", {
      hands,
      centerPile: [],
      turnIndex: 0,
    });

    res.json({
      success: true,
      hands,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const playCard = async (req, res) => {
  try {
    const { roomId, card } = req.body;
    const username = req.user.username;

    const room = await Room.findOne({ id: roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const currentPlayer = room.users[room.turnIndex];

    if (currentPlayer !== username) {
      return res.status(403).json({ message: "Not your turn" });
    }

    const hand = room.hands.get(username) || [];
    if (!hand.includes(card)) {
      return res.status(400).json({ message: "Card not in hand" });
    }

    room.hands.set(
      username,
      hand.filter((c) => c !== card)
    );

    room.centerPile.push({ username, card });

    room.turnIndex = (room.turnIndex + 1) % room.users.length;

    await room.save();

    req.io.to(roomId).emit("card-played", {
      hands: Object.fromEntries(room.hands),
      centerPile: room.centerPile,
      turnIndex: room.turnIndex,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Play failed" });
  }
};
