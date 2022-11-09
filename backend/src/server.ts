import { readFileSync } from "node:fs";
import { ApolloServer } from "apollo-server";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Resolvers } from "./generated/resolvers-types";
import Greetings from "./models";
import { Context } from "./context";
import { databaseClient } from "./db";

const typeDefs = readFileSync("./schema.graphql", "utf8");

databaseClient.connect();

const resolvers: Resolvers<Context> = {
  Query: {
    greetings: async (_, __, { dataSources }) => {
      const greetings = await dataSources.greetings.listGreetings();
      const randomIdx = Math.floor(Math.random() * greetings.length);
      return greetings[randomIdx]?.text ?? null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    preserveResolvers: true,
  }),
  dataSources: () => ({
    greetings: new Greetings(databaseClient.db().collection("greetings")),
  }),
});

// The `listen` method launches a web server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
