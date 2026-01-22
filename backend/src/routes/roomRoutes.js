// TODO: Room routes (create room, join room, etc.)
import express from 'express';
import { create, join } from '../controllers/roomController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, create);
router.post('/join', authMiddleware, join);

export default router;