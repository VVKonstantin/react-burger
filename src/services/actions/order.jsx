import { postOrder } from "../../utils/api";

export const CLEAR_ORDER = 'CLEAR_ORDER';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';

export function setOrder(data) {
  return function (dispatch) {
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
