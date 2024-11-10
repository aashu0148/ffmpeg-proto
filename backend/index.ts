import express, { Express } from "express";
import cors from "cors";

import serverRouter from "./app/server";
import configs from "./utils/configs";

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/videos", express.static("./videos"));

app.use(serverRouter);

app.listen(configs.PORT, () => {
  console.log(`🚀 Backend is up at port ${configs.PORT} `);
});
