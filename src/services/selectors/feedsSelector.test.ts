import { selectFeed } from './feedSelectors';
import { RootState } from '@store';
import { TOrdersData } from '@utils-types';
import { TOrder } from '@utils-types';

describe('selectFeed', () => {
  const mockOrders: TOrder[] = [
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

  const mockFeedState = {
    feed: {
      orders: mockOrders
    } as TOrdersData
  } as RootState;

  test('должен вернуть feed из state', () => {
    const selected = selectFeed(mockFeedState);
    expect(selected).toEqual(mockFeedState.feed);
  });

  test('не должен мутировать state', () => {
    const oldState = JSON.parse(JSON.stringify(mockFeedState));
    selectFeed(mockFeedState);
    expect(mockFeedState).toEqual(oldState);
  });
});
