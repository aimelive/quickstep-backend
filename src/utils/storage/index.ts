import * as dotenv from "dotenv";
import { cloudinaryStorage } from "./cloudinary";
import { s3Storage } from "./s3";
import { ImageStorage, UploadedImage } from "./types";

dotenv.config();

const providers: Record<string, ImageStorage> = {
  s3: s3Storage,
  cloudinary: cloudinaryStorage,
};

//Pick the provider named by IMAGE_STORAGE in .env, defaulting to s3
export function getStorage(): ImageStorage {
  const name = (process.env.IMAGE_STORAGE || "s3").trim().toLowerCase();
  const storage = providers[name];

  if (!storage) {
    throw new Error(
      `Unknown IMAGE_STORAGE "${name}", expected one of: ${Object.keys(
        providers
      ).join(", ")}`
    );
  }

  return storage;
}

// Upload a file to the configured storage
export async function uploadFile(
  file: Express.Multer.File
): Promise<UploadedImage> {
  return await getStorage().upload(file);
}

//Get imageUrl from the configured storage
export async function getImageUrl(key: string): Promise<string> {
  return await getStorage().getImageUrl(key);
}

export { ImageStorage, UploadedImage };
