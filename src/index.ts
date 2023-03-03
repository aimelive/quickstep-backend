import http from "http";
import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./restful";
import {
  getCurrentUser,
  getRoomUsers,
  userJoin,
  userLeave,
} from "./utils/users";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

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
    const user = userJoin(data.user, data.username, data.room);

    socket.join(user.room);

    //Welcome user
    socket.emit("connected", "Welcome to Quick step live location tracking");
    socket.broadcast
      .to(user.room)
      .emit("connected", `${user.username} has joined the party`);

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

// Restful API routes
app.use("/", routes);

// Listening on the PORT server
server.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT} 🔥`);
});