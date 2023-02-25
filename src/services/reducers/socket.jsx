import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/socket.jsx'

const initialState = {
  wsConnected: false,
  orders: null,
  wsError: false,
  isGot: false
}

export const wsReducer = (state = initialState, action) => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      }

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload,
        isGot: true
      }

  default:
    return state;
  }
}
