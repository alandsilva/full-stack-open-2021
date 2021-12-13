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
        <Form.Label>Email address</Form.Label>
        <Form.Control {...username} reset={null} placeholder='Enter email' />
        <Form.Text className='text-muted'>
          Well never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control {...password} reset={null} placeholder='Password' />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
