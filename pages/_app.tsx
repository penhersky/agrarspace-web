import "../styles/common.less";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { IconContext } from "react-icons";
import { Provider as StoreProvider } from "react-redux";

import client from "../services/client";
import store from "../store/store";

const IconsStyle = { className: "icons" };

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <IconContext.Provider value={IconsStyle}>
        <Component {...pageProps} />
      </IconContext.Provider>
    </StoreProvider>
  </ApolloProvider>
);

export default appWithTranslation(App);
