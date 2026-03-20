import { getFeedsApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.orders = [];
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const feedReducer = feedSlice.reducer;
