import { v2 as cloudinary } from "cloudinary";
import { ImageStorage, UploadedImage } from "./types";

let configured = false;

//Cloudinary keys, read lazily so an S3 only setup doesn't need them
function configure() {
  if (configured) return;

  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Cloudinary storage is not configured, set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET"
    );
  }

  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
  configured = true;
}

//Optional folder every upload lands in, e.g. quickstep/profiles
function folder(): string | undefined {
  return process.env.CLOUDINARY_FOLDER || undefined;
}

export const cloudinaryStorage: ImageStorage = {
  name: "cloudinary",

  // Upload a file to Cloudinary
  async upload(file): Promise<UploadedImage> {
    configure();

    const result = await cloudinary.uploader.upload(file.path, {
      public_id: file.filename,
      folder: folder(),
      resource_type: "image",
    });

    return { key: result.public_id, url: result.secure_url };
  },

  //Get imageUrl, cloudinary urls are public so no signing is needed
  async getImageUrl(key: string): Promise<string> {
    configure();

    return cloudinary.url(key, { secure: true });
  },
};
