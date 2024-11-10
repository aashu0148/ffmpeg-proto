import * as express from "express";

import { uploadSingleFile } from "./fileUploadServices";
import { singleVideoUploadMiddleware } from "#utils/multer";

const rootRouter = express.Router();
const router = express.Router();

router.post("/upload", singleVideoUploadMiddleware, uploadSingleFile);

rootRouter.use("/videos", router);

export default rootRouter;
