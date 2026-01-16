import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// TODO: Add routes here

app.get('/', (req, res) => {
  res.json({ message: 'Call Break API Server' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
