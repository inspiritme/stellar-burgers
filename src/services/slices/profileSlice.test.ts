import { profileReducer, profileOrders } from './profileSlice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));
import { getOrdersApi } from '@api';
const mockedOrderApi = getOrdersApi as jest.Mock;

const mockOrders = [
  {
    _id: '69c8ef9ea64177001b330d58',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2026-03-29T09:23:42.424Z',
    updatedAt: '2026-03-29T09:23:42.644Z',
    number: 103349
  },
  {
    _id: '69c83e8ea64177001b330cfe',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2026-03-28T20:48:14.918Z',
    updatedAt: '2026-03-28T20:48:15.184Z',
    number: 103348
  },
  {
    _id: '69c83dfba64177001b330cfb',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Био-марсианский spicy флюоресцентный минеральный бургер',
    createdAt: '2026-03-28T20:45:47.089Z',
    updatedAt: '2026-03-28T20:45:47.323Z',
    number: 103347
  },
  {
    _id: '69c7cf32a64177001b330cc4',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2026-03-28T12:53:06.310Z',
    updatedAt: '2026-03-28T12:53:06.577Z',
    number: 103346
  },
  {
    _id: '69c7c7aca64177001b330cbd',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Метеоритный краторный бургер',
    createdAt: '2026-03-28T12:21:00.409Z',
    updatedAt: '2026-03-28T12:21:00.658Z',
    number: 103345
  }
];

const mockOrders2 = [
  {
    _id: '69c8ef9ea64177001b330d58',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2026-03-29T09:23:42.424Z',
    updatedAt: '2026-03-29T09:23:42.644Z',
    number: 103349
  },
  {
    _id: '69c83e8ea64177001b330cfe',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2026-03-28T20:48:14.918Z',
    updatedAt: '2026-03-28T20:48:15.184Z',
    number: 103348
  }
];

mockedOrderApi
  .mockResolvedValueOnce(mockOrders)
  .mockResolvedValueOnce(mockOrders2);

describe('тесты личных заказов /orders', () => {
  const store = configureStore({
    reducer: {
      profile: profileReducer
    }
  });

  test('получение личных заказов', async () => {
    const state = await store.dispatch(profileOrders());
    const state2 = await store.dispatch(profileOrders());
    expect(state.payload).toHaveLength(5);
    expect(state2.payload).toHaveLength(2);
  });
});
