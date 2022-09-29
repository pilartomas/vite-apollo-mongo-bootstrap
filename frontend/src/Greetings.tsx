import { FC } from "react";
import { useGreetingsQueryQuery } from "./generated/generated-types";

export const Greetings: FC = () => {
  const { data } = useGreetingsQueryQuery();
  return <h3>{data?.greetings ?? "loading ..."}</h3>;
};
