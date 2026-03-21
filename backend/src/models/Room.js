import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  id: { type: String, required: true },
  password: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  users: [{ type: String }],
  admin: { type: String, required: true },

  gameStarted: {
    type: Boolean,
    default: false,
  },

  phase: {
    type: String,
    enum: ["lobby", "bidding", "playing", "roundComplete", "gameComplete"],
    default: "lobby",
  },

  roundNumber: {
    type: Number,
    default: 0,
  },

  totalRounds: {
    type: Number,
    default: 5,
  },

  hands: {
    type: Map,
    of: [Number],
    default: {},
  },

  bids: {
    type: Map,
    of: Number,
    default: {},
  },

  tricksWon: {
    type: Map,
    of: Number,
    default: {},
  },

  scores: {
    type: Map,
    of: Number,
    default: {},
  },

  turnIndex: {
    type: Number,
    default: 0, 
  },

  roundStarterIndex: {
    type: Number,
    default: 0,
  },

  trickStarterIndex: {
    type: Number,
    default: 0,
  },

  leadSuit: {
    type: Number,
    default: null,
  },

  completedTricksInRound: {
    type: Number,
    default: 0,
  },

  centerPile: {
    type: [
      {
        username: String,
        card: Number,
      },
    ],
    default: [],
  },

  lastTrickWinner: {
    type: String,
    default: "",
  },

  latestRoundSummary: {
    type: [
      {
        username: String,
        bid: Number,
        tricks: Number,
        roundScore: Number,
        totalScore: Number,
      },
    ],
    default: [],
  },

  winner: {
    type: [String],
    default: [],
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
