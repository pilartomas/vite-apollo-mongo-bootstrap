import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Greetings } from "./Greetings";

const client = new ApolloClient({
  uri: import.meta.env.VITE_SERVER_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Greetings />
    </ApolloProvider>
  );
}

export default App;
