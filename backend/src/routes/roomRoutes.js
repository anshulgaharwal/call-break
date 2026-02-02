// TODO: Room routes (create room, join room, etc.)
import express from 'express';
import { create, deleteRoom, getRoomDetails, join, verifyPassword, removePlayer, startGame } from '../controllers/roomController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { playCard } from '../controllers/gameController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/create', create);
router.post('/join', join);
router.post('/delete', deleteRoom);
router.post("/verify-password", verifyPassword);
router.post("/remove-player", removePlayer);
router.get("/:roomId", getRoomDetails);
router.post("/start", startGame);
router.post("/play", playCard);


export default router;