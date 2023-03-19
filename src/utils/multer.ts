import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// const storage = multer.diskStorage({});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  // Check if the file type is valid
  if (!file.mimetype.match(/jpg|jpeg|png|octet-stream/)) {
    const error = new Error("Invalid image file");
    return callback(error);
  }

  // Accept the file
  callback(null, true);
};

export const upload = multer({ dest: "uploads/", fileFilter });
