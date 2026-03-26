import { FC } from 'react';
import { useSelector } from '@store';
import { TOrder, TOrdersData } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { selectFeed } from '@selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feed = useSelector<TOrdersData>(selectFeed);
  const { orders } = feed;

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
