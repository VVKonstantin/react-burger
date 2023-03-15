import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_AUTH
} from '../actions/socket'

import { TWSConnectionActions } from '../actions/socket';
import { TOrders } from '../types/data';

type TWSState = {
  wsConnected: boolean;
  orders: TOrders | null;
  ordersAuth: TOrders | null;
  wsError: boolean;
  isGot: boolean;
};

const initialState: TWSState = {
  wsConnected: false,
  orders: null,
  ordersAuth: null,
  wsError: false,
  isGot: false
};

export const wsReducer = (state = initialState, action: TWSConnectionActions): TWSState => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: false
      }

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload,
        isGot: true
      }

      case WS_GET_MESSAGE_AUTH:
        return {
          ...state,
          ordersAuth: action.payload,
          isGot: true
        }

  default:
    return state;
  }
}
