import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Context } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const server = new ApolloServer<Context>({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    preserveResolvers: true,
  }),
});
