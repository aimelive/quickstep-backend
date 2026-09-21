import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import { ImageStorage, UploadedImage } from "./types";

//Signed urls are valid for 7 days, the maximum AWS allows
const URL_EXPIRES_IN = 604800;

let client: S3Client | undefined;

//AWS keys, read lazily so a cloudinary only setup doesn't need them
function env() {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_BUCKET_REGION;
  const accessKeyId = process.env.AWS_ACCES_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "S3 storage is not configured, set AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCES_KEY and AWS_SECRET_KEY"
    );
  }

  return { bucketName, region, accessKeyId, secretAccessKey };
}

//Declaring new S3 client instance on first use
function getClient(): S3Client {
  if (!client) {
    const { region, accessKeyId, secretAccessKey } = env();
    client = new S3Client({
      credentials: { accessKeyId, secretAccessKey },
      region,
    });
  }
  return client;
}

export const s3Storage: ImageStorage = {
  name: "s3",

  // Upload a file to S3
  async upload(file): Promise<UploadedImage> {
    const { bucketName } = env();
    const fileStream = fs.createReadStream(file.path);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
      ContentType: file.mimetype,
    });

    await getClient().send(command);

    return { key: file.filename, url: await this.getImageUrl(file.filename) };
  },

  //Get imageUrl
  async getImageUrl(key: string): Promise<string> {
    const { bucketName } = env();
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });

    return await getSignedUrl(getClient(), command, {
      expiresIn: URL_EXPIRES_IN,
    });
  },
};
