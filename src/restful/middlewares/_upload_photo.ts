import { Request, Response, NextFunction } from "express";
import Respond from "../../utils/respond";
import { getImageUrl, uploadFile } from "../../utils/s3";

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

    await uploadFile(req.file);

    await unlinkFile(req.file.path);

    const imgUrl = await getImageUrl(req.file.filename);

    res.locals.profileImageUrl = imgUrl;
    next();
  } catch (error) {
    return respond.error(error);
  }
};
