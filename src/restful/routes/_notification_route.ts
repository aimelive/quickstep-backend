import express from "express";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notification";

const notificationRoutes = express.Router();

notificationRoutes.get("/", getNotifications);
notificationRoutes.delete("/:id", deleteNotification);

export default notificationRoutes;
