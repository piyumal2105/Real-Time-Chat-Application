import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { handleSocket } from "./utils/socketHandler.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected successfully 🖥️"))
  .catch((err) => console.log(err));

handleSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
