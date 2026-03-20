import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrdersData } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { fetchFeeds } from '@slices';
import { FC, useEffect } from 'react';
import { selectFeed } from '@selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  const { orders } = useSelector<TOrdersData>(selectFeed);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
