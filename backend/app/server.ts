import { Router, Response, Request } from "express";

import fileUploadRoutes from "./fileUpload/fileUploadRoutes";

const router = Router();

router.get("/hi", (_req: Request, res: Response): any =>
  res.send("Hello there!")
);

router.use(fileUploadRoutes);

export default router;
