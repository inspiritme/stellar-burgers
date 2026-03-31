import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
        state.isIngredientsLoading = false;
      });
  }
});

export const ingredientsReducer = ingredientSlice.reducer;
export { initialState as ingredientsInitialState };
