import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registration } from '@slices';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // dispatch(
    //   registration({
    //     name: userName,
    //     email,
    //     password
    //   })
    // )
    //   .unwrap()
    //   .then(() => navigate('/'));
    try {
      dispatch(
        registration({
          name: userName,
          email,
          password
        })
      ).unwrap();

      navigate('/');
    } catch (err) {
      // ничего делать не нужно —
      // ошибка уже лежит в state.user.error
    }
  };

  return (
    <RegisterUI
      errorText={error ?? undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
