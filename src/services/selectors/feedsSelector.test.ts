import { selectFeed } from './feedSelectors';
import { RootState } from '@store';
import { TOrdersData } from '@utils-types';
import { MOCK_ORDERS } from '../../mocks/orders';

describe('selectFeed', () => {
  const mockFeedState = {
    feed: {
      orders: MOCK_ORDERS
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
