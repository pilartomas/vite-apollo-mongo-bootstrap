import type { GreetingsDataSource } from "./dataSources";

export interface Context {
  dataSources: {
    greetings: GreetingsDataSource;
  };
}
