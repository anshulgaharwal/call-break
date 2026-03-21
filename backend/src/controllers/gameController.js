import {
  emitRoomState,
  playCardForRoom,
  serializeRoomState,
  startGameForRoom,
  startNextRoundForRoom,
  submitBidForRoom,
} from "../services/gameService.js";

export const startGame = async (req, res) => {
  try {
    const { roomId } = req.body;
    const username = req.user.username;
    const room = await startGameForRoom(roomId, username);
    emitRoomState(req.app.get("io"), room);

    res.json({
      success: true,
      room: serializeRoomState(room),
    });
  } catch (err) {
    const statusCode =
      err.message === "Room not found"
        ? 404
        : err.message === "Only admin can start the game"
          ? 403
          : 400;

    res.status(statusCode).json({ message: err.message });
  }
};

export const submitBid = async (req, res) => {
  try {
    const { roomId, bid } = req.body;
    const room = await submitBidForRoom(roomId, req.user.username, bid);

    emitRoomState(req.app.get("io"), room);

    res.json({
      success: true,
      room: serializeRoomState(room),
    });
  } catch (err) {
    const statusCode = err.message === "Room not found" ? 404 : 400;
    res.status(statusCode).json({ message: err.message });
  }
};

export const playCard = async (req, res) => {
  try {
    const { roomId, card } = req.body;
    const room = await playCardForRoom(roomId, req.user.username, card);

    emitRoomState(req.app.get("io"), room);

    res.json({
      success: true,
      room: serializeRoomState(room),
    });
  } catch (err) {
    const statusCode =
      err.message === "Room not found"
        ? 404
        : err.message === "Not your turn"
          ? 403
          : 400;

    res.status(statusCode).json({ message: err.message });
  }
};

export const nextRound = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await startNextRoundForRoom(roomId, req.user.username);

    emitRoomState(req.app.get("io"), room);

    res.json({
      success: true,
      room: serializeRoomState(room),
    });
  } catch (err) {
    const statusCode =
      err.message === "Room not found"
        ? 404
        : err.message === "Only admin can start the next round"
          ? 403
          : 400;

    res.status(statusCode).json({ message: err.message });
  }
};
