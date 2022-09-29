import { MongoClient } from "mongodb";

export const databaseClient = new MongoClient(
  "mongodb://localhost:27017/bootstrap"
);
