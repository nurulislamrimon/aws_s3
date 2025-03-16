import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";

config();

// create client using user credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
// create a function to get signed url
const getObjectCommand = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
};

const putObjectCommand = async (filename, contentType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `/uploads/${filename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
};

// console.log(await getObjectCommand("myPhoto.jpg"));
// console.log(await putObjectCommand("myPhoto.jpg", "image/jpeg"));
