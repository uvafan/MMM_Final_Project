import React from 'react';
import './App.css';
import jsonData from './data/data'
import LineChart from './LineChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LineChart jsonData={jsonData}/>
      </header>
    </div>
  );
}

export default App;
