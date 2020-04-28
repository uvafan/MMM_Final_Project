import React, {useState, useEffect} from 'react';
import './App.css';
import { API_URL } from './constants';
import LineChart from './LineChart';

const App = () => {
  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(
        (result) => {
          setJsonData(result);
        },
        (error) => {
          console.log(error);
        },
      )
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <LineChart jsonData={jsonData}/>
      </header>
    </div>
  );
}

export default App;
