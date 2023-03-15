import {
  CLEAR_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS
} from "../actions/order";

import { TOrderActions } from "../actions/order";

type TOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderNumber: number | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: null
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        orderNumber: action.number
      };
    }
    case POST_ORDER_FAILED: {
      return {
        orderRequest: false,
        orderFailed: true,
        orderNumber: null
      };
    }
    case CLEAR_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
