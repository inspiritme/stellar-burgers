import { selectProfileOrders } from './profileSelectors';
import { RootState } from '@store';
import { MOCK_ORDERS } from '../../mocks/orders';

describe('селекторы файла profileSelectors.ts', () => {
  const mockState = {
    profile: {
      orders: MOCK_ORDERS
    }
  } as RootState;

  test('проверяем точно получения', () => {
    const selected = selectProfileOrders(mockState);
    expect(selected).toEqual(mockState.profile.orders);
  });

  test('не должен мутировать state', () => {
    const oldState = JSON.parse(JSON.stringify(mockState));

    selectProfileOrders(mockState);
    expect(mockState).toEqual(oldState);

    mockState.profile.orders.push(MOCK_ORDERS[0]);
    expect(mockState).not.toEqual(oldState);
  });
});
