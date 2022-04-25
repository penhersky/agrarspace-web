import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import store from "../store/store";
import { getTokenDate } from "../utils/storage";

const { MAIN_ENDPOINT_URL } = process.env;

const httpLink = new HttpLink({
  uri: `${MAIN_ENDPOINT_URL}/graphql`,
});

const link = ApolloLink.from([httpLink]);

const authLink = setContext((_, { headers }) => {
  const nowDate = Date.now();

  const deviceData = getTokenDate("device");
  const adminData = getTokenDate("admin");

  return {
    headers: {
      ...headers,
      "x-token-session-x": store.getState().user.token ?? "",
      "x-token-permanent-x":
        deviceData?.expiresIn &&
        (deviceData?.expiresIn === "unlimited" ||
          Number(deviceData?.expiresIn ?? 0) > nowDate)
          ? deviceData.token
          : "",
      "x-token-admin-x":
        adminData?.expiresIn &&
        (adminData?.expiresIn === "unlimited" ||
          Number(adminData?.expiresIn ?? 0) < nowDate)
          ? adminData.token
          : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({ addTypename: false }),
});

export default client;
