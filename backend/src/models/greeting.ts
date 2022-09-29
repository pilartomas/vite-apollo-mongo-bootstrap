import { ObjectId } from "mongodb";

export interface GreetingDocument {
  _id: ObjectId;
  text: string;
}
