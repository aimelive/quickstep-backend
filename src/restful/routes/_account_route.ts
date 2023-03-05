import express from "express";
import AuthValidate from "../../utils/validations/_user_validate";
import UserController from "../controllers/account";
import AuthMiddleWare from "../middlewares/_auth_middleware";

const accountRoutes = express.Router();

accountRoutes.get(
  "/",
  AuthMiddleWare.isLoggedIn,
  AuthMiddleWare.isAdmin,
  UserController.getAllUsers
);
accountRoutes.post(
  "/create",
  AuthValidate.create,
  AuthMiddleWare.isAccountExist,
  UserController.createAccount
);

export default accountRoutes;