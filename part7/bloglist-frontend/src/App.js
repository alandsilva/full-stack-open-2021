import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import './index.css';

import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { logout, getAuthFromMemory } from './reducers/authReducer';

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const handleCreateBlog = async (newBlog) => {
    dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(getAuthFromMemory());
  }, []);

  const loginForm = () => {
    return <LoginForm />;
  };
  const blogsData = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {auth.user.name} logged in{' '}
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='create Blog' ref={blogFormRef}>
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>

        <div className='blogs-list'>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={auth.user} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <Notification />
      {auth === null ? loginForm() : blogsData()}
    </div>
  );
};

export default App;
