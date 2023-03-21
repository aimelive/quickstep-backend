import Respond from "../../utils/respond";
import { Response, Request } from "express";
import Profile from "../../database/models/profile";
import mongoose from "mongoose";
export default class ProfileController {
  /// Create profile of the user
  static createProfile = async (req: Request, res: Response) => {
    const respond = new Respond(res);
    try {
      const userId: string = res.locals.accountId;
      if (!userId) throw new Error("User not logged in");

      const imgUrl = res.locals.profileImageUrl;

      const { username, email } = req.body;
      if (!imgUrl || !username || !email)
        throw new Error("All fields are required");

      const profile = await Profile.create({ username, email, imgUrl, userId });

      return respond.success(200, {
        message: "User profile created successfully",
        data: profile,
        // data: profile,
      });
    } catch (error) {
      return respond.error(error);
    }
  };

  static getProfile = async (req: Request, res: Response) => {
    const respond = new Respond(res);
    try {
      const userId: string = res.locals.accountId;

      if (!userId) throw new Error("User not logged in");

      const profile = await Profile.findOne({ userId });

      return respond.success(200, {
        message: "User profile retrieved successfully",
        data: profile,
      });
    } catch (error) {
      return respond.error(error);
    }
  };

  static getMultipleProfiles = async (req: Request, res: Response) => {
    const respond = new Respond(res);
    try {
      const userId: string = res.locals.accountId;

      if (!userId) throw new Error("User not logged in");

      const ids = req.body.users.filter(
        (id: string, index: number) =>
          mongoose.Types.ObjectId.isValid(id) &&
          req.body.users.indexOf(id) === index
      );
      if (ids.length < 1) {
        return respond.success(400, {
          message: "Can't find users selected",
          data: undefined,
        });
      }
      const profiles = await Profile.find({ userId: { $in: ids } });

      return respond.success(200, {
        message: "Profiles retrieved successfully",
        count: profiles.length,
        data: profiles,
      });
    } catch (error) {
      return respond.error(error);
    }
  };
}
