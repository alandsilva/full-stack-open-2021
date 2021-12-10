import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { like, remove } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeBlog = () => {
    dispatch(like(blog));
  };

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}?'`)) {
      dispatch(remove(blog.id));
    }
  };

  return (
    <div className='blog'>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible} className='detailsContent'>
        <p className='url'>{blog.url}</p>
        <p className='likes'>
          likes <span className='like-value'>{blog.likes}</span>{' '}
          <button onClick={handleLikeBlog}>like</button>
        </p>
        <p>{blog.user.name}</p>

        {user.username === blog.user.username && (
          <button onClick={handleRemoveBlog}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
