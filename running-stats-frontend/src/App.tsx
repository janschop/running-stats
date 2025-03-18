// src/App.tsx
import React from 'react';
import './App.css';
import ActivitiesList from './components/ActivitiesList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Running Stats</h1>
      </header>
      <main>
        <ActivitiesList />
      </main>
    </div>
  );
}

export default App;
