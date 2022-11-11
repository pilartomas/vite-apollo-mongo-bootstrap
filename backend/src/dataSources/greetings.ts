import { ObjectId } from "mongodb";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Collection, MongoDataSource } from "apollo-datasource-mongodb";

export interface GreetingDocument {
  _id: ObjectId;
  text: string;
}

export class GreetingsDataSource extends MongoDataSource<GreetingDocument> {
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
