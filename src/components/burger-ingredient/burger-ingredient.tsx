import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addBun, addIngredient } from '@slices';
import { useDispatch } from '@store';
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const handleAdd = () => {
      const item = {
        ...ingredient,
        id: uuidv4()
      };

      if (ingredient.type === 'bun') {
        dispatch(addBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
