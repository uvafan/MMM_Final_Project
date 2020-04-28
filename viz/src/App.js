import React from 'react';
import './App.css';
import jsonData from './data/data'
import {Line} from 'react-chartjs-2';

const STATE_MAPPING = {
  's': 'Susceptible', 
  'e': 'Exposed', 
  'i': 'Infected', 
  'p': 'Preventative Isolation',
  'a': 'Asymptomatic Isolation', 
  'q': 'Quarantined', 
  'h': 'Requires Hospitalization', 
  'r': 'Recovered', 
  'f': 'Fatality' 
}

const STATES = Object.keys(STATE_MAPPING);

const generateColor = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

function App() {
  var labels = [...Array(Object.keys(jsonData).length).keys()];

  var datasets = [];
  STATES.forEach(state => {
    var stateData = [];
    for (const i in jsonData) {
      stateData.push(jsonData[i][state + '.num'])
    }
    const color = generateColor();
    datasets.push({
      label: STATE_MAPPING[state],
      fill: false,
      backgroundColor: color,
      borderColor: color,
      pointBorderColor: color,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: stateData
    })
  });
  
  const options = {
    responsive: true,
    title: {
      display: true,
      text: 'COVID19 Chart'
    },
    tooltips: {
      mode: 'index',
      position: 'nearest',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Day'
        }
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Number of People'
        }
      }
    }
  }

  const data = {
    labels,
    datasets,
  };
  return (
    <div className="App">
      <header className="App-header">
        <Line data={data} options={options}/>
      </header>
    </div>
  );
}

export default App;
