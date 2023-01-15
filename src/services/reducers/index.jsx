import { burgerReducer } from './burger';
import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  ingredient: ingredientReducer
});
