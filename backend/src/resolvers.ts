import { Context } from "./context";
import { Resolvers } from "./generated/resolvers-types";

export const resolvers: Resolvers<Context> = {
  Query: {
    greetings: async (_, __, { dataSources }) => {
      const greetings = await dataSources.greetings.listGreetings();
      const randomIdx = Math.floor(Math.random() * greetings.length);
      return greetings[randomIdx]?.text ?? null;
    },
  },
};
