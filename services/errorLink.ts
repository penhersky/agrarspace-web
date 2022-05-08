import { fromPromise, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { ERROR_CODES } from "../constants/error";
import { getTokenDate, setTokenDate } from "../utils/storage";
import { REFRESH_TOKEN } from "./schemas/auth.schema";

const getNewToken = async (link: HttpLink) => {
  const rToken = getTokenDate("rToken");

  return fetch(link.options.uri as string, {
    method: "POST",
    body: JSON.stringify({
      operationName: "RefreshToken",
      query: REFRESH_TOKEN,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-r-token-x": rToken ?? "",
    },
  }).then((value) => value.json());
};

// eslint-disable-next-line import/prefer-default-export
export const errorLink = (link: HttpLink) =>
  // eslint-disable-next-line consistent-return
  onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      // eslint-disable-next-line no-restricted-syntax
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case ERROR_CODES.AUTHENTICATION_ERROR_SESSION:
            return fromPromise(
              getNewToken(link).catch(() => {
                // TODO: add action for global error Handler
              })
            ).flatMap((value) => {
              setTokenDate("session", value.data.refreshToken.token);
              setTokenDate("rToken", value.data.refreshToken.rToken);
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  "x-user-session-token-x": value.data.refreshToken.token,
                },
              });

              return forward(operation);
            });

          case ERROR_CODES.AUTHENTICATION_ERROR_RESIGN_IN:
            // TODO: add redirect to sign in
            break;

          default:
            break;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`); // TODO: add action for global error Handler
  });
