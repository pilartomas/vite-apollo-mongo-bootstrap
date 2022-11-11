import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import Greetings from "./models";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { Context } from "./context";
import { MongoClient } from "mongodb";

describe("Integration tests", () => {
  let server: ApolloServer<Context>;
  const databaseClient = new MongoClient(process.env.MONGO_URL as string);

  const createContext = async (): Promise<Context> => {
    return {
      dataSources: {
        greetings: new Greetings(databaseClient.db().collection("greetings"), {
          cache: server.cache,
        }),
      },
    };
  };

  beforeAll(async () => {
    server = new ApolloServer({
      schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        preserveResolvers: true,
      }),
    });
    await databaseClient.connect();
  });

  beforeEach(async () => {
    await databaseClient.db().dropDatabase();
  });

  test("Basic query", async () => {
    const collection = databaseClient.db().collection("greetings");
    await collection.insertOne({ text: "Greetings!" });

    const response = await server.executeOperation(
      {
        query: "query Greetings { greetings }",
      },
      { contextValue: await createContext() }
    );
    if (response.body.kind !== "single") throw new Error();
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toHaveProperty(
      "greetings",
      "Greetings!"
    );
  });

  afterAll(async () => {
    await server.stop();
  });
});
