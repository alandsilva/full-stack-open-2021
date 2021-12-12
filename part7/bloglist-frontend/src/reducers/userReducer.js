/* eslint-disable indent */
import userService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      console.log(users);
      dispatch({
        type: 'INIT_USERS',
        data: users,
      });
    } catch (error) {
      console.log('failed to get users');
    }
  };
};

export default reducer;
