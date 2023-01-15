import {
  DEL_INGREDIENT_INFO,
  SET_INGREDIENT_INFO
} from "../actions/ingredient";

const initialState = {};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_INFO: {
      return action.item;
    }
    case DEL_INGREDIENT_INFO: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
