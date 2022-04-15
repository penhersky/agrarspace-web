import { applyMiddleware, createStore, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

// const { NODE_ENV } = process.env;

function configureStore(preloadedState: any) {
  const middlewares = [] as Middleware[];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(...enhancers)
  );

  return store;
}

const store = configureStore({});

export default store;
