import React from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';
import { useField } from '../hooks';

const LoginForm = () => {
  const dispatch = useDispatch();

  const username = useField('text');
  const password = useField('password');

  const handleLogin = (event) => {
    event.preventDefault();
    const newLogin = { username: username.value, password: password.value };
    dispatch(login(newLogin));
  };
  return (
    <div>
      <form className='loginForm' onSubmit={handleLogin}>
        <div>
          username
          <input {...username} reset={null} />
        </div>
        <div>
          password
          <input {...password} reset={null} />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
