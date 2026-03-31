import { selectUser } from './userSelectors';
import { RootState } from '@store';
import { TUser } from '@utils-types';

describe('тест user селектора', () => {
  const mockUser: TUser = {
    email: 'example@test.ru',
    name: 'Anton'
  };
  const mockState = {
    user: {
      user: mockUser,
      isAuthChecked: true,
      isLoading: false,
      error: null
    }
  } as RootState;

  test('получить данные юзера', () => {
    const user = selectUser(mockState);
    expect(user).toEqual(mockState.user);
  });
});
