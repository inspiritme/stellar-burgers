import { selectProfileOrders } from './profileSelectors';
import { RootState } from '@store';
import { TOrder } from '@utils-types';

describe('селекторы файла profileSelectors.ts', () => {
  const mockProfileOrders: TOrder[] = [
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
    }
  ];

  const mockState = {
    profile: {
      orders: mockProfileOrders
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

    mockState.profile.orders.push(mockProfileOrders[0]);
    expect(mockState).not.toEqual(oldState);
  });
});
