const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification;
    case 'REMOVE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

let timer;
export const setNotification = (notification, time) => {
  return async (dispatch) => {
    clearTimeout(timer);
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification },
    });

    timer = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};

export default reducer;
