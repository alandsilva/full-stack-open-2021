import React from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';
import { useField } from '../hooks';

import { Form, Button } from 'react-bootstrap';

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
    <Form onSubmit={handleLogin}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>username</Form.Label>
        <Form.Control
          id='username'
          {...username}
          reset={null}
          placeholder='Enter Username'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>password</Form.Label>
        <Form.Control
          id='password'
          {...password}
          reset={null}
          placeholder='Password'
        />
      </Form.Group>
      <Button id='login-button' variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
