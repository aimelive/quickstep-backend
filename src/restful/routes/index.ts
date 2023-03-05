import express from "express";
import accountRoutes from "./_account_route";
import movementRoutes from "./_movement_route";
import notificationRoutes from "./_notification_route";

const routes = express.Router();

routes.use("/movements", movementRoutes);
routes.use("/accounts", accountRoutes);
routes.use("/notifications", notificationRoutes);

export default routes;
