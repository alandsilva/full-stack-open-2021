import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from '../reducers/userReducer';

import { Table } from 'react-bootstrap';

const UserList = () => {
  const users = useSelector((state) => state.users);
  console.log(users);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('userlist useeffect');
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <h3>Users</h3>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
