import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { like, remove, addComment } from '../reducers/blogReducer';
import { useField } from '../hooks';

import { Card, Button, Form, Table } from 'react-bootstrap';

const Blog = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const blog = useSelector((state) =>
    state.blogs.filter((blog) => blog.id === params.id)
  )[0];
  const user = useSelector((state) => state.auth.user);
  const comment = useField('text');

  const handleLikeBlog = () => {
    dispatch(like(blog));
  };

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}?'`)) {
      dispatch(remove(blog.id));
      navigate('/');
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment.value));
    comment.reset();
  };

  if (!blog) {
    return null;
  }

  return (
    <div className='container'>
      <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {blog.author}
          </Card.Subtitle>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
          <Card.Text>
            Likes {blog.likes}{' '}
            <Button variant='outline-primary' onClick={handleLikeBlog}>
              like
            </Button>
          </Card.Text>
          <Card.Text>{blog.user.name}</Card.Text>
        </Card.Body>
      </Card>

      {user.username === blog.user.username && (
        <Card.Text>
          <Button variant='outline-danger' onClick={handleRemoveBlog}>
            Delete
          </Button>
        </Card.Text>
      )}

      <h3>comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Control {...comment} reset={null} placeholder='Enter comment' />
          <Form.Text className='text-muted'>
            Say what yout thought about this blog
          </Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>
          add comment
        </Button>
      </Form>

      <Table striped>
        <tbody>
          {blog.comments.map((comment) => (
            <tr key={comment + Math.random() * 100}>
              <td>{comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Blog;
