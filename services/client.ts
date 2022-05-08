import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getTokenDate } from "../utils/storage";
import { errorLink } from "./errorLink";

const { MAIN_ENDPOINT_URL } = process.env;

const httpLink = new HttpLink({
  uri: `${MAIN_ENDPOINT_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const rToken = getTokenDate("rToken");
  const session = getTokenDate("session");
  const adminSession = getTokenDate("admin");

  return {
    headers: {
      ...headers,
      "x-user-session-token-x": session ?? "",
      "x-r-token-x": rToken ?? "",
      "x-admin-session-token-x": adminSession ?? "",
    },
  };
});

const link = ApolloLink.from([authLink, errorLink(httpLink), httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ addTypename: false }),
});

export default client;
