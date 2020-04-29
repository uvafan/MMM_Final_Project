import React from "react";
import "./App.css";
import { Line } from "react-chartjs-2";
import { STATE_MAPPING, STATES } from "./constants";
import { generateColor } from "./utils";

const LineChart = ({ jsonData }) => {
  var labels = [...Array(Object.keys(jsonData).length).keys()];

  var datasets = [];
  STATES.forEach((state) => {
    var stateData = [];
    for (const i in jsonData) {
      stateData.push(jsonData[i][state + ".num"]);
    }
    const color = generateColor();
    datasets.push({
      label: STATE_MAPPING[state],
      fill: false,
      backgroundColor: color,
      borderColor: color,
      pointBorderColor: color,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: stateData,
    });
  });

  const options = {
    aspectRatio: 1.5,
    responsive: true,
    title: {
      display: true,
      text: "COVID19 Chart",
    },
    tooltips: {
      mode: "index",
      position: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Day",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Number of People",
        },
      },
    },
  };

  const data = {
    labels,
    datasets,
  };
  return <Line data={data} options={options} height={null} width={null} />;
};

export default LineChart;
