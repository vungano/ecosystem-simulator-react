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
      label: "Dataset 1 (linear interpolation)",
      backgroundColor: color(chartColors.red)
        .alpha(0.5)
        .rgbString(),
      borderColor: chartColors.red,
      fill: true,
      lineTension: 0,
      borderDash: [8, 4],
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
          <Line data={data} options={options} />
        </div>

        <div className="info">
          <p className="head">Population</p>
          <hr />
          <div className="flex">
              <div className="pop-container">
                  <p>Rabbits : 20</p>
              </div>
              <div className="vr"></div>

              <div className="pop-container">
                  <p>Foxes : 20</p>
              </div>
              <div className="vr"></div>

              <div className="pop-container">
                  <p>Plants : 20</p>
              </div>
               <p className="status">LIVE</p> 
          </div>

        


        </div>
    </div>
  );
}

export default InfoField;
