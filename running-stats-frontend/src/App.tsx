// src/App.tsx
import React from 'react';
import './App.css';
import ActivitiesGraph from './components/ActivitiesGraph';
import ActivitiesWeeklyBarChart from './components/ActivitiesWeeklyBarChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Running Stats</h1>
      </header>
      <main>
        <ActivitiesGraph />
        <ActivitiesWeeklyBarChart />
      </main>
    </div>
  );
}

export default App;
