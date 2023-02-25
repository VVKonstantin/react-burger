import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';

import thunk from 'redux-thunk';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl)));

export const store = createStore(rootReducer, enhancer);
