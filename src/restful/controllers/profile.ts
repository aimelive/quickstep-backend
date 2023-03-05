import Respond from "../../utils/respond";
import { Response, Request } from "express";
import { getImageUrl, uploadFile } from "../../utils/s3";
import fs from "fs";
import util from "util";
import Profile from "../../database/models/profile";

const unlinkFile = util.promisify(fs.unlink);

export default class ProfileController {
  static createProfile = async (req: Request, res: Response) => {
    const respond = new Respond(res);
    try {
      const userId: string = res.locals.accountId;

      if (!userId) throw new Error("User not logged in");

      if (!req.file) throw new Error("Profile photo required");

      await uploadFile(req.file);

      await unlinkFile(req.file.path);

      const imgUrl = await getImageUrl(req.file.filename);

      const { username, email } = req.body;

      const profile = await Profile.create({ username, email, imgUrl, userId });

      return respond.success(200, {
        message: "User profile retrieved successfully",
        data: profile,
      });
    } catch (error) {
      return respond.error(error);
    }
  };
}
