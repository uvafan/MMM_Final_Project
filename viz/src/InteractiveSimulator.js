import React, {useState, useEffect} from 'react';
import { API_URL } from './constants';
import LineChart from './LineChart';

const InteractiveSimulator = () => {
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
  
  return <LineChart jsonData={jsonData}/>;
}

export default InteractiveSimulator;
