/* eslint-disable indent */
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CREDENTIALS':
      return action.data;
    case 'REMOVE_CREDENTIALS':
      return null;
    default:
      return state;
  }
};

export const login = (newLogin) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(newLogin);
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: 'SET_CREDENTIALS',
        data: { user },
      });
    } catch (err) {
      dispatch(setNotification('Wrong credentials', 'error', 5));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser');
    blogService.setToken(null);
    dispatch({
      type: 'REMOVE_CREDENTIALS',
    });
  };
};

export const getAuthFromMemory = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({
        type: 'SET_CREDENTIALS',
        data: { user },
      });
      blogService.setToken(user.token);
    }
  };
};

export default reducer;
