import { strict as assert } from "node:assert";
import { Context } from "../src/context";
import { MongoClient } from "mongodb";
import { Collections, GreetingsDataSource } from "../src/dataSources";
import { server } from "../src/server";

describe("Integration tests", () => {
  const databaseClient = new MongoClient(process.env.MONGO_URL as string);

  // eslint-disable-next-line @typescript-eslint/require-await
  const createContext = async (): Promise<Context> => {
    return {
      dataSources: {
        greetings: new GreetingsDataSource(
          databaseClient.db().collection(Collections.Greetings),
          {
            cache: server.cache,
          }
        ),
      },
    };
  };

  beforeAll(async () => {
    await databaseClient.connect();
  });

  beforeEach(async () => {
    await databaseClient.db().dropDatabase();
  });

  test("Greetings query", async () => {
    const expectedGreeting = "Greetings!";

    const collection = databaseClient.db().collection("greetings");
    await collection.insertOne({ text: expectedGreeting });

    const response = await server.executeOperation(
      {
        query: "query Greetings { greetings }",
      },
      { contextValue: await createContext() }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data).toHaveProperty(
      "greetings",
      expectedGreeting
    );
  });

  afterAll(async () => {
    await databaseClient.close();
  });
});
