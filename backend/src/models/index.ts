import { MongoDataSource } from "apollo-datasource-mongodb";
import { GreetingDocument } from "./greeting";

export default class Greetings extends MongoDataSource<GreetingDocument> {
    listGreetings() {
        return this.findByFields({})
    }
}
