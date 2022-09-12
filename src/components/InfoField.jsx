import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";
import '../styles/infofield.css'
import { useSelector } from "react-redux";
import { Range } from "react-range";

const Chart = require("react-chartjs-2").Chart;

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

const color = Chart.helpers.color;
const data = {
  datasets: [
    {
      label: "Rabbits Population",
      backgroundColor: color(chartColors.red)
        .alpha(0.5)
        .rgbString(),
      borderColor: chartColors.red,
      fill: true,
      lineTension: 0,
      borderDash: [4, 2],
      data: []
    }
  ]
};


function InfoField(props) {

  const rabbits = useSelector(state=>state.rabbits)
  const options = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          distribution: "linear",
          realtime: {
            onRefresh: function(chart) {
              chart.data.datasets[0].data.push({
                x: moment(),
                y: rabbits.length
              });
            },
            delay: 3000,
            time: {
              displayFormat: "h:mm"
            }
          },
          ticks: {
            displayFormats: 1,
            maxRotation: 0,
            minRotation: 0,
            stepSize: 1,
            maxTicksLimit: 30,
            minUnit: "second",
            source: "auto",
            autoSkip: true,
            callback: function(value) {
              return moment(value, "HH:mm:ss").format("mm:ss");
            }
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 20
          }
        }
      ]
    }
  };
  
  return (
    <div className='infofield'>
        <div className="barchart">
          <Line data={data} options={options}  />
        </div>

        <div class="slidecontainer">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
        </div>
        <div className="info">
          <p className="head">Population Statistics</p>
          <hr />
          <div className="grid">
              <p></p>              <p className="bold centre rab"> Rabbits</p> <p className="bold centre fx">Foxes</p> <p className="bold centre plnt">Plants</p>
              <p>Starting Pop</p>  <p className="centre">1</p>                 <p className="centre">1</p>             <p className="centre">1</p>   
              <p>Current Pop</p>   <p className="centre">1</p>                 <p className="centre">1</p>             <p className="centre">1</p> 
              <p>Males</p>         <p className="centre">1</p>                 <p className="centre">1</p>             <p className="centre">1</p>       
              <p>Females</p>       <p className="centre">1</p>                 <p className="centre">1</p>             <p className="centre">1</p>
          </div>  


        </div>
    </div>
  );
}

export default InfoField;
