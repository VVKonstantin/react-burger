import { getCookie } from '../../utils/cookie.js';

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage} = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
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

          if (restParsedData.message === 'Invalid or missing token' ||
          restParsedData === 'jwt expired') {
            dispatch({ type: onError, payload: restParsedData.message });
          }
          else {
            dispatch({ type: onMessage, payload: restParsedData });
          }
        }
      }
      next(action);
    }
  }
}
