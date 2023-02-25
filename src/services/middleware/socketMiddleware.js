import { getCookie } from '../../utils/cookie.js';

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsInitAuth, onOpen, onClose, onError, onMessage} = wsActions;
      const token = getCookie('accessToken');

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (type === wsInitAuth) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        }

        socket.onmessage = event => {
          const { data } = event;
          const parseData = JSON.parse(data);
          const { success, ...restParsedData } = parseData;

          dispatch({ type: onMessage, payload: restParsedData });
        }
      }
      next(action);
    }
  }
}
