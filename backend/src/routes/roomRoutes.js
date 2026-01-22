// TODO: Room routes (create room, join room, etc.)
import express from 'express';
import { create, join } from '../controllers/roomController.js';

const router = express.Router();

router.post('/join', join);
router.post('/create', create);

export default router;