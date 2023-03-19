import express from "express";
import MovementValidate from "../../utils/validations/_movement_validate";
import {
  addMovement,
  deleteMovement,
  getAllMovements,
  getMovement,
  leaveMovement,
} from "../controllers/movement";
import AuthMiddleWare from "../middlewares/_auth_middleware";

const movementRoutes = express.Router();

movementRoutes.get("/", AuthMiddleWare.isLoggedIn, getAllMovements);
movementRoutes.get("/:id", AuthMiddleWare.isLoggedIn, getMovement);
movementRoutes.patch("/:id", AuthMiddleWare.isLoggedIn, leaveMovement);
movementRoutes.post(
  "/create",
  AuthMiddleWare.isLoggedIn,
  MovementValidate.create,
  addMovement
);
movementRoutes.delete("/:deleteId", AuthMiddleWare.isLoggedIn, deleteMovement);

export default movementRoutes;
