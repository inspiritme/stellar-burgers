import { RootState } from '@store';

export const selectProfileOrders = (state: RootState) => state.profile.orders;
