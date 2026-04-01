import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi, TNewOrderResponse, TNewOrder } from '@api';
interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TNewOrder | null;
}

export const burgerOrder = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { rejectValue: { error: string } }
>('constructor/burderOrder', async (ingredients, { rejectWithValue }) => {
  if (!ingredients.length) {
    return rejectWithValue({ error: 'Добавьте ингредиенты' });
  }
  try {
    const res = await orderBurgerApi(ingredients);
    return res;
  } catch (err) {
    return rejectWithValue({ error: 'Сетевая ошибка' });
  }
});

const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    closeOrder(state) {
      state.constructorItems = { bun: null, ingredients: [] };
      state.orderRequest = false;
      state.orderModalData = null;
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<any | null>) {
      state.orderModalData = action.payload;
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0) {
        const newArr = state.constructorItems.ingredients;
        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      const newArr = state.constructorItems.ingredients;
      if (index < newArr.length - 1) {
        [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(burgerOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(burgerOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload?.order || null;
      })
      .addCase(burgerOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  closeOrder,
  setOrderRequest,
  setOrderModalData,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
export { initialState as constructorInitialState };
