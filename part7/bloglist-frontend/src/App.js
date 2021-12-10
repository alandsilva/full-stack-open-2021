import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import './index.css';
import blogService from './services/blogs';
import loginService from './services/login';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const handleCreateBlog = async (newBlog) => {
    dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
  };

  const handleLogin = async (newLogin) => {
    try {
      const user = await loginService.login(newLogin);
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error', 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    return <LoginForm login={handleLogin} />;
  };
  const blogsData = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='create Blog' ref={blogFormRef}>
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>

        <div className='blogs-list'>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <Notification />
      {user === null ? loginForm() : blogsData()}
    </div>
  );
};

export default App;
