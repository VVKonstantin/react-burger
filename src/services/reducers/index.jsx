import { authReducer } from './auth';
import { burgerReducer } from './burger';
import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { wsReducer } from './socket';

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  wsData: wsReducer
});
