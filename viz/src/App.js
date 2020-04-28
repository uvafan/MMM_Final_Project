import React from 'react';
import logo from './logo.svg';
import './App.css';
import jsonData from './data/data'
import {Line} from 'react-chartjs-2';

const STATES = ['s', 'r', 'i', 'a', 'e', 'h', 'f', 'q', 'p'];

const generateColor = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

function App() {

  var labels = [...Array(366).keys()];

  var datasets = [];
  STATES.forEach(state => {
    var stateData = [];
    for (const i in jsonData) {
      // stateData.push({"x": parseInt(i), "y": jsonData[i][state + '.num']})
      stateData.push(jsonData[i][state + '.num'])
    }
    const color = generateColor()
    datasets.push({
      label: state,
      fill: false,
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: color,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: stateData
    })
  });
  const data = {
    labels: labels,
    datasets: datasets,
  };
  console.log(data)
  return (
    <div className="App">
      <header className="App-header">
        <Line data={data} />
      </header>
    </div>
  );
}

export default App;
