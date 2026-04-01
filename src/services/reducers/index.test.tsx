import { rootReducer } from '.';
import { RootState } from '@store';
import {
  ingredientsInitialState,
  userInitialState,
  constructorInitialState,
  feedInitialState,
  orderInitialState,
  profileInitialState
} from '@slices';

const state: RootState = rootReducer(undefined, { type: '' });

const expectedState: RootState = {
  ingredients: ingredientsInitialState,
  burgerConstructor: constructorInitialState,
  user: userInitialState,
  feed: feedInitialState,
  order: orderInitialState,
  profile: profileInitialState
};

describe('тестируем rootReducer', () => {
  test('проверяем начальное состояние хранилища', () => {
    expect(state).toStrictEqual(expectedState);
  });
});
