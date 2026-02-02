import express from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoutes from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import { connectDB } from "./config/database.js";
import Room from "./models/Room.js";
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/auth", userRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/invitation", invitationRoutes);
app.use("/game", gameRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Call Break API Server" });
});



app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("play-card", async ({ roomId, username, card }) => {
    try {
      const room = await Room.findOne({ id: roomId });
      if (!room) return;

      const hand = room.hands.get(username) || [];

      room.hands.set(
        username,
        hand.filter((c) => c !== card),
      );

      room.centerPile.push({ username, card });

      await room.save();

      io.to(roomId).emit("card-played", {
        hands: Object.fromEntries(room.hands),
        centerPile: room.centerPile,
      });
    } catch (err) {
      console.error("play-card error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
