import { getData } from "../../utils/api";

export const CLEAR_COUNTERS = 'CLEAR_COUNTERS';
export const DEC_COUNTER = 'DEC_COUNTER';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const INC_COUNTER = 'INC_COUNTER';
export const SET_BUN_COUNTER = 'SET_BUN_COUNTER';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getData()
      .then(res => {
        if (res && res.success) {
          const dataWithCounter = [];
          res.data.map((item) => {
            dataWithCounter.push({ ...item, counter: 0 })
          })
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredientsList: dataWithCounter
          });
        }
        else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      }).catch(e => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  }
}
