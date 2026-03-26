import { TUser } from '@utils-types';
import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { selectUser } from '@selectors';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector(selectUser);
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
};
