import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import UserList from './components/UserList';
import User from './components/User';
import Menu from './components/Menu';
import './index.css';

import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { getAuthFromMemory } from './reducers/authReducer';

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
      {auth === null ? (
        loginForm()
      ) : (
        <div>
          <Menu />
          <h2>blogs</h2>
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
