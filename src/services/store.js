import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';

import thunk from 'redux-thunk';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_AUTH_USER,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_AUTH
} from '../services/actions/socket.jsx';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitAuth: WS_CONNECTION_START_AUTH_USER,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const wsActionsAuth = {
  wsInit: WS_CONNECTION_START_AUTH_USER,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE_AUTH
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrl, wsActionsAuth)));

export const store = createStore(rootReducer, enhancer);
