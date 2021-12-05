import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  return (
    <div>
      <h2>Anecdote</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
