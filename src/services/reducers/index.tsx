import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsReducer,
  constructorReducer,
  userReducer,
  feedReducer,
  orderReducer,
  profileReducer
} from '@slices';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  profile: profileReducer
});
