import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../reducers/authReducer';

const Menu = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav>
      <Link to='/'>blogs</Link> <Link to='/users'>users</Link> {auth.user.name}{' '}
      logged in <button onClick={handleLogout}>logout</button>
    </nav>
  );
};

export default Menu;
