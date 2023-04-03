import { getData } from "../../utils/api";

import { AppDispatch } from "../types";
import { TIngredient, TRawIngredient } from "../types/data";

export const CLEAR_COUNTERS = 'CLEAR_COUNTERS';
export const DEC_COUNTER = 'DEC_COUNTER';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const INC_COUNTER = 'INC_COUNTER';
export const SET_BUN_COUNTER = 'SET_BUN_COUNTER';

interface IClearCountersAction {
  readonly type: typeof CLEAR_COUNTERS;
}

interface IDecCounterAction {
  readonly type: typeof DEC_COUNTER;
  id: string;
}

interface IIncCounterAction {
  readonly type: typeof INC_COUNTER;
  id: string;
}

interface ISetBunCounterAction {
  readonly type: typeof SET_BUN_COUNTER;
  id: string;
}

interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredientsList: Array<TIngredient>;
}

export type TIngredientsActions = IClearCountersAction
  | IDecCounterAction
  | IIncCounterAction
  | ISetBunCounterAction
  | IGetIngredientsFailedAction
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction;

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getData()
      .then(res => {
        if (res && res.success) {
          const dataWithCounter: TIngredient[] = [];
          res.data.map((item: TRawIngredient) => {
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
