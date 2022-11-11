import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { MongoClient } from "mongodb";
import Greetings from "./models";
import { Context } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const startServer = async () => {
  const server = new ApolloServer<Context>({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      preserveResolvers: true,
    }),
  });

  const databaseClient = new MongoClient("mongodb://localhost:27017/bootstrap");
  await databaseClient.connect();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
      return {
        dataSources: {
          greetings: new Greetings(
            databaseClient.db().collection("greetings"),
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
