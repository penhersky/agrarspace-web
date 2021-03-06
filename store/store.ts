import { applyMiddleware, createStore, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

// const { NODE_ENV } = process.env;

function configureStore(preloadedState: any) {
  const middlewares = [thunk] as Middleware[];
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

export type StateType = ReturnType<typeof rootReducer>;

export default store;
