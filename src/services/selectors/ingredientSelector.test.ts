import {
  selectIngredients,
  selectOnlyIngredients,
  selectIngredientById,
  selectBuns,
  selectMains,
  selectSauces
} from './ingredientsSelector';

import { RootState } from '@store';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 0,
    calories: 250,
    price: 150,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: '3',
    name: 'Соус',
    type: 'sauce',
    proteins: 1,
    fat: 1,
    carbohydrates: 5,
    calories: 20,
    price: 30,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

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
