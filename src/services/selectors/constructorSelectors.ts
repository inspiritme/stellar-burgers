import { RootState } from '@store';

export const selectBurgerIngredients = (state: RootState) =>
  [
    state.burgerConstructor.constructorItems.bun?._id,
    ...state.burgerConstructor.constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    ),
    state.burgerConstructor.constructorItems.bun?._id
  ] as string[];
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;
export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;
