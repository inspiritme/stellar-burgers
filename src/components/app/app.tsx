import {
  ConstructorPage,
  NotFound404,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  ProtectedRoute,
  OrderInfo,
  IngredientDetails,
  Modal
} from '@components';
import { Preloader } from '@ui';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '@store';
import { fetchIngredients, getUser } from '@slices';
import { useEffect } from 'react';
import { selectIngredients } from '@selectors';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const { ingredients, isIngredientsLoading, error } =
    useSelector(selectIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const closeModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />

      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : !ingredients.length ? (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет ингредиентов
        </div>
      ) : (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed/:id' element={<OrderInfo />} />
            <Route
              path='/profile/orders/:id'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:id'
                element={
                  <Modal title='Информация о заказе' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:id'
                element={
                  <ProtectedRoute>
                    <Modal title='Информация о заказе' onClose={closeModal}>
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
