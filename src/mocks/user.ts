import { TUser } from "@utils-types";
import { RootState } from "@store";

const mockUser: TUser = {
  email: 'example@test.ru',
  name: 'Anton'
};
export const mockUserState = {
  user: {
    user: mockUser,
    isAuthChecked: true,
    isLoading: false,
    error: null
  }
} as RootState;