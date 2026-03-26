import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectBurgerIngredients,
  selectUser
} from '@selectors';
import { useSelector, useDispatch } from '@store';
import { useNavigate, useLocation } from 'react-router-dom';
import { burgerOrder, closeOrder } from '@slices';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const orderIngredients = useSelector(selectBurgerIngredients);
  const { user } = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', {
        state: {
          from: location
        }
      });
      return;
    }
    dispatch(burgerOrder(orderIngredients));
  };
  const closeOrderModal = () => dispatch(closeOrder());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
