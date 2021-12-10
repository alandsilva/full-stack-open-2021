import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import './index.css';
import blogService from './services/blogs';
import loginService from './services/login';

import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const handleCreateBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog);
      dispatch(
        setNotification(
          `A new blog '${response.title}' by '${response.author}'`,
          'success',
          5
        )
      );
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(response));
    } catch (error) {
      dispatch(setNotification('Failed to create blog', 'error', 5));
    }
  };

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      const response = await blogService.update(id, updatedBlog);
      dispatch(
        setNotification(`Liked the '${response.title}' blog`, 'success', 5)
      );
      setBlogs(
        blogs.map((blog) =>
          blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
        )
      );
    } catch (error) {
      dispatch(setNotification('failed to update blog', 'error', 5));
    }
  };

  const handleRemoveBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      dispatch(setNotification('Blog was deleted', 'success', 5));
    } catch (error) {
      dispatch(setNotification('Failed to remove blog', 'error', 5));
    }
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
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(blogs);
    });
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
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={handleUpdateBlog}
              removeBlog={handleRemoveBlog}
              user={user}
            />
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
