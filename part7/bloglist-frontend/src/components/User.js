import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Table } from 'react-bootstrap';

const User = () => {
  let params = useParams();
  let user = useSelector((state) =>
    state.users.filter((user) => user.id === params.id)
  )[0];

  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <Table striped>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                {blog.title} - {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
