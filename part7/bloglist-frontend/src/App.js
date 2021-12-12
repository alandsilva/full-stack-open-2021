import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import UserList from './components/UserList';
import User from './components/User';
import './index.css';

import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { logout, getAuthFromMemory } from './reducers/authReducer';

import { Routes, Route, Link } from 'react-router-dom';

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
        <Togglable buttonLabel='create Blog' ref={blogFormRef}>
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>

        <div className='blogs-list'>
          {blogs.map((blog) => (
            // <Blog key={blog.id} blog={blog} user={auth.user} />
            <p key={blog.id} className='blog'>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </p>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {auth === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {auth.user.name} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Routes>
            <Route path='/users/:id' element={<User />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/blogs/:id' element={<Blog />} />
            <Route path='/' element={blogsData()} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
