import {
  CLEAR_COUNTERS,
  DEC_COUNTER,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INC_COUNTER,
  SET_BUN_COUNTER
} from "../actions/ingredients";

const initialState = {
  ingredientsList: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredientsList: action.ingredientsList
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    }
    case INC_COUNTER: {
      return {
        ...state,
        ingredientsList: state.ingredientsList.map((el) => (
          (el._id === action.id) ? { ...el, counter: el.counter + 1 } : el
        ))
      }
    }
    case DEC_COUNTER: {
      return {
        ...state,
        ingredientsList: state.ingredientsList.map((el) => (
          (el._id === action.id) ? { ...el, counter: el.counter - 1 } : el
        ))
      }
    }
    case SET_BUN_COUNTER: {
      return {
        ...state,
        ingredientsList: state.ingredientsList.map((el) => {
          if (el.type !== 'bun') return el;
          else if (el._id === action.id) return { ...el, counter: 2 };
          else return { ...el, counter: 0 };
        })
      }
    }
    case CLEAR_COUNTERS: {
      return {
        ...state,
        ingredientsList: state.ingredientsList.map((el) => {
          return { ...el, counter: 0 };
        })
      }
    }
    default: {
      return state;
    }
  }
};
