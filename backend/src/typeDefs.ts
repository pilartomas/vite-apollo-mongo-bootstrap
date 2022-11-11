import { readFileSync } from "node:fs";

export const typeDefs = readFileSync("./schema.graphql", "utf8");
