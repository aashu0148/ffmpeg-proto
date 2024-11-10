import { config } from "dotenv";
config();

const defaultPort = 5000;
const configs = {
  PORT: process.env.PORT || defaultPort,
};

export { configs as default };
