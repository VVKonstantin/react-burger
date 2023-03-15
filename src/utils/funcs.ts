import { TIngredient } from "../services/types/data";

export function createUniqueId(item: TIngredient) {
  return {...item, uniqueId: (item._id + (new Date()).getTime())};
}
