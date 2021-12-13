import React from 'react';
import { useField } from '../hooks';

import { Form, Button } from 'react-bootstrap';

const BlogForm = ({ createBlog }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('url');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    createBlog(newBlog);
    title.reset();
    author.reset();
    url.reset();
  };
  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Title</Form.Label>
          <Form.Control {...title} reset={null} placeholder='Enter Title' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            {...author}
            reset={null}
            placeholder='Author McAuthor'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>URL</Form.Label>
          <Form.Control {...url} reset={null} placeholder='https://url.com' />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
