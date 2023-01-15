import {
  CLEAR_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS
} from "../actions/order";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: null
};

export const orderReducer = (state = initialState, action) => {
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
        ...state,
        orderRequest: false,
        orderFailed: true
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
