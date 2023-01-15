import {
  ADD_BUN_TO_BURGER,
  ADD_INGREDIENT_TO_BURGER,
  CLEAR_BURGER,
  DEL_INGREDIENT_FROM_BURGER,
  SORT_INGREDIENTS_IN_BURGER
} from "../actions/burger";

const initialState = {
  bun: [],
  items: []
}

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_BURGER: {
      return {
        ...state,
        items: [...state.items, action.item]
      }
    }
    case ADD_BUN_TO_BURGER: {
      return {
        ...state,
        bun: [action.item]
      }
    }
    case DEL_INGREDIENT_FROM_BURGER: {
      return {
        ...state,
        items: [...state.items.filter((el) => el.uniqueId !== action.id)]
      }
    }
    case SORT_INGREDIENTS_IN_BURGER: {
      return {
        ...state,
        items: action.data
      }
    }
    case CLEAR_BURGER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
