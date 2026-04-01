import {
  loginUser,
  logoutUser,
  getUser,
  userReducer,
  userInitialState,
  updateUser,
  registration,
  setError
} from './authSlice';
import { TUser } from '@utils-types';
import { TLoginData, TRegisterData } from '@api';

const mockUser: TUser = { email: 'example@test.ru', name: 'Gerald' };
const mockUser2: TUser = { email: 'example2@test.ru', name: 'Anton' };
const mockRegisterData: TRegisterData = { ...mockUser, password: '111111' };
const authResponse = {
  user: { ...mockUser },
  accessToken: '213',
  refreshToken: '321'
};

describe('тесты AUTH апи /auth/user', () => {
  test('setError reducer', () => {
    const state = userReducer(userInitialState, setError('Some error'));
    expect(state.error).toBe('Some error');
  });
  test('pending { isLoading:true }', () => {
    const action = getUser.pending('pending-test');
    const state = userReducer(userInitialState, action);
    expect(action.type).toContain('pending');
    expect(state.isLoading).toBe(true);
  });
  test('fulfilled { isLoading:false, user:TUser, isAuthChecked:true }', () => {
    const action = getUser.fulfilled(mockUser, 'auth-request-id');
    const state = userReducer(userInitialState, action);
    expect(state).toMatchObject({
      isLoading: false,
      user: mockUser,
      isAuthChecked: true
    });
    expect(state.user).not.toEqual(mockUser2);
  });
  test('rejected', () => {
    const action = getUser.rejected(new Error(), 'rejected-test');
    const state = userReducer(userInitialState, action);
    expect(state).toMatchObject({
      isLoading: false,
      user: null,
      isAuthChecked: true
    });
  });
  // test('getUser rejected with Error', () => {
  //   const action = getUser.rejected(new Error('fail'), 'id');
  //   const state = userReducer(userInitialState, action);
  //   expect(state.error).toBeNull();
  // });

  // test('getUser rejected with null', () => {
  //   const action = getUser.rejected(null as any, 'id');
  //   const state = userReducer(userInitialState, action);
  //   expect(state.error).toBeNull();
  // });
});

describe('тесты LOGIN через форму: апи /auth/login', () => {
  const mockLoginData: TLoginData = {
    email: 'example@test.ru',
    password: '111111'
  };

  test('fulfilled { user:TUser, error:null }', () => {
    const action = loginUser.fulfilled(
      mockUser,
      'login-request-id',
      mockLoginData
    );
    const state = userReducer(userInitialState, action);
    expect(state).toMatchObject({ user: action.payload, error: null });

    const prevState = {
      ...userInitialState,
      error: 'old error'
    };
    const action2 = loginUser.fulfilled(mockUser, 'id', mockLoginData);

    const state2 = userReducer(prevState, action2);

    expect(state2.error).toBeNull();
  });
  test('login clears error', () => {
    const prevState = {
      ...userInitialState,
      error: 'old error'
    };
    const action = loginUser.fulfilled(mockUser, 'id', mockLoginData);

    const state = userReducer(prevState, action);

    expect(state.error).toBeNull();
  });
  test('rejected { isLoading:false, error:null }', () => {
    const action = loginUser.rejected(
      new Error(),
      'login-rejected-id',
      mockLoginData
    );
    const state = userReducer(userInitialState, action);
    expect(state).toMatchObject({ isLoading: false, error: action.payload });
  });
});

describe('тесты LOGOUT через форму: апи /auth/logout', () => {
  test('fulfilled { user:null }', () => {
    const action = logoutUser.fulfilled({ success: true }, 'logout-request-id');
    const state = userReducer(userInitialState, action);
    expect(state.user).toBeNull();
  });
});

describe('тесты UPDATE апи auth/user', () => {
  test('pending { isLoading:true }', () => {
    const action = updateUser.pending('update-pending-id', mockRegisterData);
    const state = userReducer(userInitialState, action);
    expect(state.isLoading).toBeTruthy();
  });
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthChecked: true
  };

  test('should set isLoading=true on updateUser.pending', () => {
    const action = {
      type: updateUser.pending.type
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('updateUser pending isLoading=true', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(userInitialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('updateUser fulfilled updates user', () => {
    const mockUser = { name: 'Test', email: 't@test.com' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(userInitialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
  });

  test('updateUser rejected sets error with payload', () => {
    const action = {
      type: updateUser.rejected.type,
      payload: 'Ошибка обновления данных'
    };
    const state = userReducer(userInitialState, action);
    expect(state.error).toBe('Ошибка обновления данных');
    expect(state.isLoading).toBe(false);
  });
});

describe('тесты REGISTRATION апи /auth/register', () => {
  test('pending { isLoading:true }', () => {
    const action = registration.pending(
      'registration-pending-test',
      mockRegisterData
    );
    const state = userReducer(userInitialState, action);
    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeNull();
  });
  test('fulfilled { isLoading:false, user:TUser, isAuthChecked:true }', () => {
    const action = registration.fulfilled(
      authResponse,
      'registration-request-id',
      mockRegisterData
    );
    const state = userReducer(userInitialState, action);
    expect(state).toMatchObject({ isLoading: false, user: authResponse.user });
  });
  test('rejected', () => {
    const action = registration.rejected(
      new Error(),
      'registration-rejected-test',
      mockRegisterData,
      'Registration failed'
    );
    const state = userReducer(userInitialState, action);
    expect(state).toMatchObject({
      isLoading: false,
      error: 'Registration failed'
    });
    expect(state.error).toBe('Registration failed');
    expect(state.isLoading).toBeFalsy();
  });
  test('registration rejected with Error object', () => {
    const action = {
      type: registration.rejected.type,
      payload: 'Registration failed',
      meta: { requestId: 'id' }
    };
    const state = userReducer(userInitialState, action);
    expect(state.error).toBe('Registration failed');
  });

  test('registration rejected with non-Error', () => {
    const action = registration.rejected(
      null,
      'id',
      mockRegisterData,
      'Registration failed'
    );
    const state = userReducer(userInitialState, action);
    expect(state.error).toBe('Registration failed'); // ветка else
  });
});
