import { FC, useMemo, useEffect } from 'react';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '@store';
import { fetchOrderByNumber } from '@slices';
import { useParams } from 'react-router-dom';
import { selectOnlyIngredients } from '@selectors';

export const OrderInfo: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderByNumber(Number(id)));
    }
  }, [dispatch, id]);

  const orderData = useSelector((state) => state.order.currentOrder);
  const ingredients: TIngredient[] = useSelector(selectOnlyIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
