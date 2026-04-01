import { TIngredient } from "@utils-types";

export const mockIngredients: TIngredient[] = [
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