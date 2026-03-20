import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '@store';
import { useParams } from 'react-router-dom';
import { selectIngredientById } from '@selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredient = useSelector(selectIngredientById(id || ''));
  const ingredientData = ingredient;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
