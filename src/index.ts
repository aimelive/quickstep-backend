import http from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./restful/routes";
import {
  getCurrentUser,
  getRoomUsers,
  userJoin,
  userLeave,
} from "./utils/users";
import User from "./@types/user";
import { connectDB } from "./database/config";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Running when user connects
io.on("connection", (socket: Socket) => {
  socket.on("joinRoom", (data) => {
    const user: User = userJoin({
      id: data.user,
      username: data.username,
      room: data.room,
      img: data.profileUrl,
      joinedAt: new Date(),
    });

    socket.join(user.room);

    //Welcome user
    socket.emit("connected", "You're connected to the movement");
    socket.broadcast
      .to(user.room)
      .emit("connected", `${user.username} has joined the movement`);

    socket.on("locationChanged", (data) => {
      const { user, lat, long } = data;
      const userA = getCurrentUser(user);

      if (!userA) return;

      io.to(userA.room).emit("locationChanged", {
        user: userA.id,
        lat,
        long,
      });
    });
    //Chatting message
    socket.on("chatMessage", (data) => {
      const { userId, message } = data;

      const userA = getCurrentUser(userId);

      if (!userA) return;

      io.to(userA.room).emit("chatMessage", {
        userId,
        message,
        sentAt: new Date(),
      });
    });
    //Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    //Runs when clients disconnect
    socket.on("disconnect", () => {
      const leavingUser = userLeave(user.id);
      if (!leavingUser) return;
      io.to(leavingUser.room).emit(
        "connected",
        `${leavingUser.username} has left the party`
      );
      //Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });
  });
});

// Default home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Quick step App backend!",
  });
});

// Restful API routes
app.use("/api/v1/", routes);

app.get("*", (req, res) => {
  res.json({
    message: "Invalid path URL!",
  });
});

// Listening on the PORT server
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} 🔥`);
  await connectDB();
});
