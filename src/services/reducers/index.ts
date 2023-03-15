import { authReducer } from './auth';
import { burgerReducer } from './burger';
import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { wsReducer } from './socket';

export const rootReducer = combineReducers({
  auth: authReducer,
  burger: burgerReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  wsData: wsReducer
});
