import express from "express";
import { upload } from "../../utils/multer";
import ProfileValidate from "../../utils/validations/_profile_validate";

import ProfileController from "../controllers/profile";
import AuthMiddleWare from "../middlewares/_auth_middleware";
import { uploadPhoto } from "../middlewares/_upload_photo";

const profileRoutes = express.Router();

profileRoutes.post(
  "/create",
  AuthMiddleWare.isLoggedIn,
  upload.single("profilePic"),
  uploadPhoto,
  ProfileController.createProfile
);

profileRoutes.get("/", AuthMiddleWare.isLoggedIn, ProfileController.getProfile);
profileRoutes.get(
  "/multiple",
  ProfileValidate.getMultiple,
  AuthMiddleWare.isLoggedIn,
  ProfileController.getMultipleProfiles
);

export default profileRoutes;
