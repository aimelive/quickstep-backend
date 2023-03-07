import Respond from "../../utils/respond";
import { Response, Request } from "express";
import Profile from "../../database/models/profile";

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
}
