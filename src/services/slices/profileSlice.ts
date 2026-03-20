import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

interface ProfileState {
  orders: TOrder[];
}

const initialState: ProfileState = { orders: [] };

export const profileOrders = createAsyncThunk(
  'profile/orders',
  async () => await getOrdersApi()
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const profileReducer = profileSlice.reducer;
