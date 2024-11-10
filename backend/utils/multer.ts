import multer, { diskStorage, FileFilterCallback, MulterError } from "multer";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { createError } from "./util";

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./videos");
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidV4();
    cb(null, uniqueId + path.extname(file.originalname));
  },
});

const videoFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes("video")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"));
  }
};

const videoUpload = multer({
  storage: storage,
  fileFilter: videoFileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

export const singleVideoUploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  videoUpload.single("file")(req, res, (err: any) => {
    if (err instanceof MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return createError(res, "File is too large. Max size is 50MB.");
      }

      return createError(res, err.message);
    } else if (err)
      return createError(res, err?.message || "Error uploading file");

    if (!req.file) return createError(res, "File not uploaded!");

    next();
  });
};
