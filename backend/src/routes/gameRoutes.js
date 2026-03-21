import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { nextRound, playCard, startGame, submitBid } from "../controllers/gameController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/start", startGame);
router.post("/bid", submitBid);
router.post("/play", playCard);
router.post("/next-round", nextRound);

export default router;
