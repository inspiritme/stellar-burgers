import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';

type CurrentOrderState = {
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: CurrentOrderState = {
  currentOrder: null,
  loading: false,
  error: null
};

// Получаем заказ по номеру
export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number);
      return res.orders[0]; // API возвращает массив, берём первый элемент
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка получения заказа');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.currentOrder = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchOrderByNumber.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { clearCurrentOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
