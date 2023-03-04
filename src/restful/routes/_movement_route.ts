import express from "express";
import {
  addMovement,
  deleteMovement,
  getAllMovements,
  getMovement,
} from "../controllers/movement";

const movementRoutes = express.Router();

movementRoutes.get("/", getAllMovements);
movementRoutes.get("/:id", getMovement);
movementRoutes.post("/create", addMovement);
movementRoutes.delete("/:id", deleteMovement);

export default movementRoutes;
