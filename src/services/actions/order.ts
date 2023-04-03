import { postOrder } from "../../utils/api";

import { AppDispatch } from "../types";

export const CLEAR_ORDER = 'CLEAR_ORDER';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';

export interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  number: number;
}

export type TOrderActions = IClearOrderAction
  | IPostOrderFailedAction
  | IPostOrderRequestAction
  | IPostOrderSuccessAction;

export function setOrder(data: Array<string>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    postOrder(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            number: res.order.number
          });
        }
        else {
          dispatch({
            type: POST_ORDER_FAILED
          });
        }
      }).catch(e => {
        dispatch({
          type: POST_ORDER_FAILED
        })
      })
  }
}
