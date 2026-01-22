// TODO: Room routes (create room, join room, etc.)
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { create, join } from '../controllers/roomController.js';

const router = express.Router();

router.post('/join', authMiddleware, join);
router.post('/create', authMiddleware, create);

export default router;