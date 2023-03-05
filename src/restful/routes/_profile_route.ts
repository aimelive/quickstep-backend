import express from "express";
import { upload } from "../../utils/multer";

import ProfileController from "../controllers/profile";
import AuthMiddleWare from "../middlewares/_auth_middleware";

const profileRoutes = express.Router();

profileRoutes.post(
  "/create",
  AuthMiddleWare.isLoggedIn,
  upload.single("profilePic"),
  ProfileController.createProfile
);

profileRoutes.get("/", AuthMiddleWare.isLoggedIn, ProfileController.getProfile);

export default profileRoutes;
