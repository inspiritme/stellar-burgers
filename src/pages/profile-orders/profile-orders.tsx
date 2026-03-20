import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { profileOrders } from '@slices';
import { selectProfileOrders } from '@selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileOrders());
  }, [dispatch]);

  const orders = useSelector(selectProfileOrders);

  return <ProfileOrdersUI orders={orders} />;
};
