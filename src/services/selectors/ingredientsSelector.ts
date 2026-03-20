import { RootState } from '@store';

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectOnlyIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const selectIngredientById = (id: string) => (state: RootState) => {
  if (!id) return undefined;
  return state.ingredients.ingredients.find((item) => item._id === id);
};

export const selectBuns = (state: RootState) =>
  state.ingredients.ingredients.filter(
    (ingredient) => ingredient.type === 'bun'
  );

export const selectMains = (state: RootState) =>
  state.ingredients.ingredients.filter(
    (ingredient) => ingredient.type === 'main'
  );

export const selectSauces = (state: RootState) =>
  state.ingredients.ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );
