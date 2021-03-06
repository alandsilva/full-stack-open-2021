import anecdoteService from '../services/anecdotes';
const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : action.data
      );
    case 'NEW_ANECDOTE':
      return state.concat(action.data);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }

  // return state;
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const id = anecdote.id;
    const updatedAnecdote = await anecdoteService.update(id, {
      content: anecdote.content,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export default reducer;
