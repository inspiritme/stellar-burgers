import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  logoutApi,
  getUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const registration = createAsyncThunk<
  { user: TUser; accessToken: string; refreshToken: string },
  TRegisterData,
  { rejectValue: string }
>('auth/registration', async (data, { rejectWithValue }) => {
  try {
    const res = await registerUserApi(data);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка при регистрации');
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(userData);
      return res.user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res.user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка авторизации');
  }
});

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Произошла ошибка');
    }
  }
);

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const { setError } = userSlice.actions;

export const userReducer = userSlice.reducer;
