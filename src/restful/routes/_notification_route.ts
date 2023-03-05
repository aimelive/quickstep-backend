import express from "express";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notification";
import AuthMiddleWare from "../middlewares/_auth_middleware";

const notificationRoutes = express.Router();

notificationRoutes.get("/", AuthMiddleWare.isLoggedIn, getNotifications);
notificationRoutes.delete(
  "/:id",
  AuthMiddleWare.isLoggedIn,
  deleteNotification
);

export default notificationRoutes;
