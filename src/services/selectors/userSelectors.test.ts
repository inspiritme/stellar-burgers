import { selectUser } from './userSelectors';
import { mockUserState } from '../../mocks/user'

describe('тест user селектора', () => {
  test('получить данные юзера', () => {
    const user = selectUser(mockUserState);
    expect(user).toEqual(mockUserState.user);
  });
});
