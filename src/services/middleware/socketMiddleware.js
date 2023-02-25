import { getCookie } from '../../utils/cookie.js';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_AUTH_USER,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/socket.jsx';

export const socketMiddleware = (wsUrl) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const token = getCookie('accessToken');

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === WS_CONNECTION_START_AUTH_USER) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        }

        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        }

        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        }

        socket.onmessage = event => {
          const { data } = event;
          const parseData = JSON.parse(data);
          const { success, ...restParsedData } = parseData;

          dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
        }
      }
      next(action);
    }
  }
}
