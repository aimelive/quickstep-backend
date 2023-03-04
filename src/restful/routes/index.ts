import express from "express";
import movementRoutes from "./_movement_route";
import notificationRoutes from "./_notification_route";

const routes = express.Router();

routes.use("/movements", movementRoutes);
routes.use("/notifications", notificationRoutes);

export default routes;
