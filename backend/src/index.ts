import { startStandaloneServer } from "@apollo/server/standalone";
import { MongoClient } from "mongodb";
import { config } from "./config";
import { Collections, GreetingsDataSource } from "./dataSources";
import { server } from "./server";

export const startServer = async () => {
  const databaseClient = new MongoClient(config.mongoURL);
  await databaseClient.connect();

  const { url } = await startStandaloneServer(server, {
    listen: { port: config.port },
    context: async () => {
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
    },
  });
  console.log(`🚀  Server ready at ${url}`);
};

startServer();
