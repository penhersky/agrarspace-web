import "../styles/common.less";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { IconContext } from "react-icons";
import { Provider as StoreProvider } from "react-redux";

import { AuthProvider, PageLoadingProvider } from "../components/providers";
import client from "../services/client";
import store from "../store/store";

const IconsStyle = { className: "icons", size: "26" };

const App = ({ Component, pageProps }: AppProps) => (
  <StoreProvider store={store}>
    <ApolloProvider client={client}>
      <IconContext.Provider value={IconsStyle}>
        <PageLoadingProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </PageLoadingProvider>
      </IconContext.Provider>
    </ApolloProvider>
  </StoreProvider>
);

export default appWithTranslation(App);
