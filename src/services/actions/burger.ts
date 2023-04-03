import { TIngredientInBurger } from "../types/data";

export const ADD_BUN_TO_BURGER = 'ADD_BUN_TO_BURGER';
export const ADD_INGREDIENT_TO_BURGER = 'ADD_INGREDIENT_TO_BURGER';
export const CLEAR_BURGER = 'CLEAR_BURGER';
export const DEL_INGREDIENT_FROM_BURGER = 'DEL_INGREDIENT_FROM_BURGER';
export const SORT_INGREDIENTS_IN_BURGER = 'SORT_INGREDIENTS_IN_BURGER';

interface IAddBunAction {
  readonly type: typeof ADD_BUN_TO_BURGER;
  item: TIngredientInBurger;
}

interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT_TO_BURGER;
  item: TIngredientInBurger;
}

interface IClearBurgerAction {
  readonly type: typeof CLEAR_BURGER;
}

interface IDelIngredientAction {
  readonly type: typeof DEL_INGREDIENT_FROM_BURGER;
  id: string;
}

interface ISortIngredientsAction {
  readonly type: typeof SORT_INGREDIENTS_IN_BURGER;
  data: Array<TIngredientInBurger>;
}

export type TBurgerActions = IAddBunAction
  | IAddIngredientAction
  | IClearBurgerAction
  | IDelIngredientAction
  | ISortIngredientsAction;
