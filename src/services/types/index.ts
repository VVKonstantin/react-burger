import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TWSConnectionActions } from '../actions/socket';
import { TAuthActions } from '../actions/auth';
import { TBurgerActions } from '../actions/burger';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';

type TApplicationActions = TWSConnectionActions
  | TAuthActions
  | TBurgerActions
  | TIngredientsActions
  | TOrderActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
