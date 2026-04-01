import {
  selectIngredients,
  selectOnlyIngredients,
  selectIngredientById,
  selectBuns,
  selectMains,
  selectSauces
} from './ingredientsSelector';

import { RootState } from '@store';
import { mockIngredients } from '../../mocks/ingredients';

const mockState = {
  ingredients: {
    ingredients: mockIngredients,
    isIngredientsLoading: false,
    error: null
  }
} as RootState;

describe('тестируем селекторы ингредиентов', () => {
  test('selectIngredients', () => {
    expect(selectIngredients(mockState)).toEqual(mockState.ingredients);
  });

  test('selectOnlyIngredients', () => {
    expect(selectOnlyIngredients(mockState)).toEqual(mockIngredients);
  });

  test('selectIngredientById', () => {
    const selector = selectIngredientById('2');
    expect(selector(mockState)).toEqual(mockIngredients[1]);
  });

  test('selectIngredientById returns undefined without id', () => {
    const selector = selectIngredientById('');
    expect(selector(mockState)).toBeUndefined();
  });

  test('selectBuns', () => {
    expect(selectBuns(mockState)).toEqual(
      mockIngredients.filter((i) => i.type === 'bun')
    );
  });

  test('selectMains', () => {
    expect(selectMains(mockState)).toEqual(
      mockIngredients.filter((i) => i.type === 'main')
    );
  });

  test('selectSauces', () => {
    expect(selectSauces(mockState)).toEqual(
      mockIngredients.filter((i) => i.type === 'sauce')
    );
  });
});
