import { orderReducer } from './orderSlice';
import { orderInitialState } from './orderSlice';
import { fetchOrderByNumber } from './orderSlice';

const mockData = {
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
};

describe('', () => {
  test('pending', () => {
    const action = fetchOrderByNumber.pending('test-id', 12);
    const state = orderReducer(orderInitialState, action);
    expect(state.loading).toBeTruthy();
    expect(state.error).toBeNull();
    expect(state.currentOrder).toBeNull();
  });
  test('fulfilled', () => {
    const action = fetchOrderByNumber.fulfilled(mockData, 'test-id', 11);
    const state = orderReducer(orderInitialState, action);
    expect(state.loading).toBeFalsy();
    expect(state.currentOrder).toEqual(mockData);
  });

  test('rejected', () => {
    const action = fetchOrderByNumber.rejected(null, 'test-id', 12, 'Ошибка');
    const state = orderReducer(orderInitialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
