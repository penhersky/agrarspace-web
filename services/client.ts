import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const { MAIN_ENDPOINT_URL } = process.env;

const httpLink = new HttpLink({
  uri: `${MAIN_ENDPOINT_URL}/graphql`,
});

const link = ApolloLink.from([httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ addTypename: false }),
});

export default client;
