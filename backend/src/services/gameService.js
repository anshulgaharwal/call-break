import Room from "../models/Room.js";
import { createDeck, shuffleDeck } from "../utils/deck.js";
import { determineTrickWinner, isValidPlay, sortHand } from "../utils/cardUtils.js";
import { calculateRoundScore, getLeaders } from "../utils/scoreUtils.js";

const TOTAL_ROUNDS = 5;
const PLAYERS_PER_GAME = 4;
const CARDS_PER_PLAYER = 13;

const mapToObject = (value) => {
  if (!value) {
    return {};
  }

  if (value instanceof Map) {
    return Object.fromEntries(value);
  }

  if (typeof value.toObject === "function") {
    return value.toObject();
  }

  return { ...value };
};

const objectToMap = (obj) => new Map(Object.entries(obj));

const createZeroedPlayerMap = (players) =>
  players.reduce((acc, player) => {
    acc[player] = 0;
    return acc;
  }, {});

export const serializeRoomState = (room) => ({
  roomId: room.id,
  admin: room.admin,
  users: room.users,
  maxPlayers: PLAYERS_PER_GAME,
  currentPlayers: room.users.length,
  gameStarted: room.gameStarted,
  phase: room.phase,
  roundNumber: room.roundNumber,
  totalRounds: room.totalRounds,
  hands: mapToObject(room.hands),
  bids: mapToObject(room.bids),
  tricksWon: mapToObject(room.tricksWon),
  scores: mapToObject(room.scores),
  turnIndex: room.turnIndex ?? 0,
  roundStarterIndex: room.roundStarterIndex ?? 0,
  trickStarterIndex: room.trickStarterIndex ?? 0,
  leadSuit: room.leadSuit,
  completedTricksInRound: room.completedTricksInRound ?? 0,
  centerPile: room.centerPile || [],
  lastTrickWinner: room.lastTrickWinner || "",
  latestRoundSummary: room.latestRoundSummary || [],
  winner: room.winner || [],
});

export const emitRoomState = (io, room) => {
  io.to(room.id).emit("room-state", serializeRoomState(room));
};

export const initializeScores = (players) => createZeroedPlayerMap(players);

export const setupRound = (room) => {
  const deck = shuffleDeck(createDeck());
  const hands = {};

  room.users.forEach((player, index) => {
    hands[player] = sortHand(
      deck.slice(index * CARDS_PER_PLAYER, (index + 1) * CARDS_PER_PLAYER),
    );
  });

  const roundStarterIndex = (room.roundNumber - 1) % room.users.length;

  room.hands = objectToMap(hands);
  room.bids = objectToMap({});
  room.tricksWon = objectToMap(createZeroedPlayerMap(room.users));
  room.turnIndex = roundStarterIndex;
  room.roundStarterIndex = roundStarterIndex;
  room.trickStarterIndex = roundStarterIndex;
  room.centerPile = [];
  room.leadSuit = null;
  room.completedTricksInRound = 0;
  room.lastTrickWinner = "";
  room.latestRoundSummary = [];
  room.phase = "bidding";

  return room;
};

export const startGameForRoom = async (roomId, username) => {
  const room = await Room.findOne({ id: roomId });

  if (!room) {
    throw new Error("Room not found");
  }

  if (room.admin !== username) {
    throw new Error("Only admin can start the game");
  }

  if (room.users.length !== PLAYERS_PER_GAME) {
    throw new Error("Exactly 4 players required");
  }

  room.gameStarted = true;
  room.roundNumber = 1;
  room.totalRounds = TOTAL_ROUNDS;
  room.scores = objectToMap(initializeScores(room.users));
  room.winner = [];
  setupRound(room);
  await room.save();

  return room;
};

export const submitBidForRoom = async (roomId, username, bid) => {
  const room = await Room.findOne({ id: roomId });

  if (!room) {
    throw new Error("Room not found");
  }

  if (room.phase !== "bidding") {
    throw new Error("Bidding is not active");
  }

  if (!room.users.includes(username)) {
    throw new Error("Player is not part of this room");
  }

  if (!Number.isInteger(bid) || bid < 1 || bid > 13) {
    throw new Error("Bid must be between 1 and 13");
  }

  const currentPlayer = room.users[room.turnIndex];
  if (currentPlayer !== username) {
    throw new Error("Not your turn to bid");
  }

  const bids = mapToObject(room.bids);
  if (typeof bids[username] === "number") {
    throw new Error("Bid already submitted");
  }

  bids[username] = bid;
  room.bids = objectToMap(bids);

  if (Object.keys(bids).length === room.users.length) {
    room.phase = "playing";
    room.turnIndex = room.roundStarterIndex;
    room.trickStarterIndex = room.roundStarterIndex;
  } else {
    room.turnIndex = (room.turnIndex + 1) % room.users.length;
  }

  await room.save();
  return room;
};

export const playCardForRoom = async (roomId, username, card) => {
  const room = await Room.findOne({ id: roomId });

  if (!room) {
    throw new Error("Room not found");
  }

  if (room.phase !== "playing") {
    throw new Error("Cards can only be played during the play phase");
  }

  const currentPlayer = room.users[room.turnIndex];
  if (currentPlayer !== username) {
    throw new Error("Not your turn");
  }

  const hands = mapToObject(room.hands);
  const playerHand = hands[username] || [];
  const currentTrick = room.centerPile || [];

  const validation = isValidPlay({
    hand: playerHand,
    currentTrick,
    card,
  });

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  hands[username] = playerHand.filter((playerCard) => playerCard !== card);
  room.hands = objectToMap(hands);
  room.centerPile = [...currentTrick, { username, card }];
  room.leadSuit = room.centerPile.length === 1 ? Math.floor(card / 13) : room.leadSuit;

  if (room.centerPile.length < PLAYERS_PER_GAME) {
    room.turnIndex = (room.turnIndex + 1) % room.users.length;
    await room.save();
    return room;
  }

  const winningPlay = determineTrickWinner(room.centerPile);
  const tricksWon = mapToObject(room.tricksWon);
  const winnerUsername = winningPlay.username;
  const winnerIndex = room.users.indexOf(winnerUsername);

  tricksWon[winnerUsername] = (tricksWon[winnerUsername] || 0) + 1;
  room.tricksWon = objectToMap(tricksWon);
  room.lastTrickWinner = winnerUsername;
  room.completedTricksInRound += 1;
  room.turnIndex = winnerIndex;
  room.trickStarterIndex = winnerIndex;
  room.centerPile = [];
  room.leadSuit = null;

  if (room.completedTricksInRound === CARDS_PER_PLAYER) {
    const bids = mapToObject(room.bids);
    const scores = mapToObject(room.scores);

    room.latestRoundSummary = room.users.map((player) => {
      const roundScore = calculateRoundScore(bids[player], tricksWon[player] || 0);
      const totalScore = Number(((scores[player] || 0) + roundScore).toFixed(1));

      scores[player] = totalScore;

      return {
        username: player,
        bid: bids[player],
        tricks: tricksWon[player] || 0,
        roundScore,
        totalScore,
      };
    });

    room.scores = objectToMap(scores);

    if (room.roundNumber >= room.totalRounds) {
      room.phase = "gameComplete";
      room.winner = getLeaders(scores);
    } else {
      room.phase = "roundComplete";
    }
  }

  await room.save();
  return room;
};

export const startNextRoundForRoom = async (roomId, username) => {
  const room = await Room.findOne({ id: roomId });

  if (!room) {
    throw new Error("Room not found");
  }

  if (room.admin !== username) {
    throw new Error("Only admin can start the next round");
  }

  if (room.phase !== "roundComplete") {
    throw new Error("The current round is not finished yet");
  }

  room.roundNumber += 1;
  setupRound(room);
  await room.save();

  return room;
};
