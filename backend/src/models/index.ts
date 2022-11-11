import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Collection, MongoDataSource } from "apollo-datasource-mongodb";
import { GreetingDocument } from "./greeting";

export default class Greetings extends MongoDataSource<GreetingDocument> {
  constructor(
    collection: Collection<GreetingDocument>,
    options: { cache: KeyValueCache<string> }
  ) {
    super(collection);
    this.initialize!({ cache: options.cache, context: {} });
  }

  listGreetings() {
    return this.findByFields({});
  }
}
