import "../styles/common.less";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { IconContext } from "react-icons";
import { Provider as StoreProvider } from "react-redux";

import { AuthProvider } from "../components/providers";
import client from "../services/client";
import store from "../store/store";

const IconsStyle = { className: "icons", size: "26" };

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <IconContext.Provider value={IconsStyle}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </IconContext.Provider>
    </StoreProvider>
  </ApolloProvider>
);

export default appWithTranslation(App);