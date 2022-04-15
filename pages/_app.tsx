import "../styles/common.less";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Provider as StoreProvider } from "react-redux";

import client from "../services/client";
import store from "../store/store";

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  </ApolloProvider>
);

export default appWithTranslation(App);
