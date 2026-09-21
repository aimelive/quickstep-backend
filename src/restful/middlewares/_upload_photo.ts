import { Request, Response, NextFunction } from "express";
import Respond from "../../utils/respond";
import { uploadFile } from "../../utils/storage";

import fs from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

export const uploadPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const respond = new Respond(res);
  try {
    if (!req.file) throw new Error("Profile photo required");

    try {
      const { url } = await uploadFile(req.file);
      res.locals.profileImageUrl = url;
    } finally {
      //Drop the temp file whether or not the upload went through
      await unlinkFile(req.file.path);
    }

    next();
  } catch (error) {
    return respond.error(error);
  }
};
