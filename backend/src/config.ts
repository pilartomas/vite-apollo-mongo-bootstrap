import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT as string),
  mongoURL: process.env.MONGO_URL as string,
};
