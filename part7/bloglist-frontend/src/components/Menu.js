import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

import { logout } from '../reducers/authReducer';

const Menu = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#' as='span'>
          <Link to='/'>blogs</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href='#' as='span'>
              <Link to='/users'>users</Link>
            </Nav.Link>
          </Nav>
          <Nav className='d-flex'>
            <Nav.Link href='#' disabled>
              {auth.user.name} logged in
            </Nav.Link>
            <Button variant='outline-danger' onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
