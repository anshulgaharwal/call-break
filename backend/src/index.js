import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import invitationRoutes from './routes/invitationRoutes.js';
import { connectDB } from './config/database.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/invitation', invitationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Call Break API Server' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
