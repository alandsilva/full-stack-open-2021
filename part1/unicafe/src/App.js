import React, { useState } from 'react';
import Button from './Button';
import StatisticLine from './StatisticLine';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const avg = (good + -1 * bad) / all;
  const pos = (good * 100) / all;

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={avg} />
            <StatisticLine text='positive' value={pos} />
          </tbody>
        </table>
      </div>
    );
  }
};

export default App;
