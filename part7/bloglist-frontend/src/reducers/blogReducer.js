/* eslint-disable indent */
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return state.concat(action.data);
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id);
    case 'LIKE':
    case 'COMMENT':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = (newObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(newObject);
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      });
      dispatch(
        setNotification(
          `A new blog '${newBlog.title}' by '${newBlog.author}'`,
          'success',
          5
        )
      );
    } catch (err) {
      dispatch(setNotification('Failed to create blog', 'danger', 5));
    }
  };
};

export const like = (blog) => {
  const blogToUpdate = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  };
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blogToUpdate);
      console.log(updatedBlog);
      dispatch({
        type: 'LIKE',
        data: updatedBlog,
      });
      dispatch(
        setNotification(`You liked '${updatedBlog.title}'`, 'success', 5)
      );
    } catch (err) {
      dispatch(setNotification('Failed to like blog', 'danger', 5));
    }
  };
};

export const remove = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id },
      });
      dispatch(setNotification('You deleted a blog', 'success', 5));
    } catch (err) {
      dispatch(setNotification('Failed to delete blog', 'danger', 5));
    }
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment);
      dispatch({
        type: 'COMMENT',
        data: updatedBlog,
      });
      dispatch(
        setNotification(`You commented on '${updatedBlog.title}'`, 'success', 5)
      );
    } catch (err) {
      dispatch(setNotification('Failed to comment on blog', 'danger', 5));
    }
  };
};

export default reducer;
