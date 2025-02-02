import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

// Configure AWS SDK
const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});

// Set up multer storage with S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`); // Generate unique file name
        },
        contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set correct MIME type
        contentDisposition: "inline"
    }),
});

export default upload;