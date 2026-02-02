// TODO: Game routes (create, join, play, etc.)
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { distributeCards } from "../controllers/gameController.js";

const router = express.Router();


router.use(authMiddleware);


router.post("/distribute", distributeCards);

export default router;
