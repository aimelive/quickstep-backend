// import S3 from "aws-sdk/clients/s3";
import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

//AWS keys
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCES_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

//Declaring new S3 client instance
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
  region,
});

// Upload a file to S3
export async function uploadFile(file: any) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName!,
    Body: fileStream,
    Key: file.filename,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(uploadParams);

  return await s3.send(command);
}

//Get imageUrl
export async function getImageUrl(key: string): Promise<string> {
  const getObjectParams = {
    Bucket: bucketName,
    Key: key,
  };
  const command = new GetObjectCommand(getObjectParams);

  const url = await getSignedUrl(s3, command, { expiresIn: 604800 });
  return url;
}
