import Greetings from "./models";

export interface Context {
  dataSources: {
    greetings: Greetings;
  };
}
