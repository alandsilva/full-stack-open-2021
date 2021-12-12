import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { like, remove } from '../reducers/blogReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const blog = useSelector((state) =>
    state.blogs.filter((blog) => blog.id === params.id)
  )[0];
  const user = useSelector((state) => state.auth.user);

  const handleLikeBlog = () => {
    dispatch(like(blog));
  };

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}?'`)) {
      dispatch(remove(blog.id));
      navigate('/');
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

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
  );
};

export default Blog;
