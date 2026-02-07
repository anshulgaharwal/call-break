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

  hands: {
    type: Map,
    of: [Number],
    default: {},
  },

  turnIndex: {
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
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
