import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdotereducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  anecdotes: anecdotereducer,
  notification: notificationReducer,
  filter: filterReducer,
});
const store = createStore(reducer, composeWithDevTools());

export default store;
