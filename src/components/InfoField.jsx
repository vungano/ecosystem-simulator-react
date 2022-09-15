import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";
import '../styles/infofield.css'
import { useSelector, useDispatch } from "react-redux";
import ReactSlider from "react-slider";
import '../styles/slider.css'

//declare varibale for initial number of elements in our ecosystem  
let iniitialRabbits, initialPlants, initialFoxes 
const Chart = require("react-chartjs-2").Chart;

//different cahrt colors to choose from
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

//data for the line chart
const data = {
  datasets: [
    {
      label: "Rabbits Population",
      backgroundColor: color(chartColors.blue)
        .alpha(0.5)
        .rgbString(),
      borderColor: chartColors.blue,
      fill: true,
      lineTension: 0,
      borderDash: [4, 2],
      data: []
    }
  ]
};


function InfoField(props) {

  //get global state values for the elements
  const rabbits = useSelector(state=>state.rabbits)
  const foxes = useSelector(state=>state.foxes)
  const plants = useSelector(state=>state.plants)

  //Set initial values 
  useEffect(()=>{
    iniitialRabbits = rabbits.length
    initialFoxes = foxes.length
    initialPlants = plants.length
    console.log(foxes)
  },[])

  let rabbitMales= 0
  let rabbitFemales = 0 
  let foxesMales= 0 
  let  foxesFemales = 0

  
  //calculate the females and males for rabbits
  for(let i=0; i<rabbits.length; i++){
    if(rabbits[i].gender==0){
        rabbitFemales++
    }
  }
  rabbitMales = rabbits.length - rabbitFemales

  //calculate the females and males for foxes
  for(let i=0; i<foxes.length; i++){
    if(foxes[i].gender==0){
        foxesFemales++
    }
  }
  foxesMales = foxes.length - foxesFemales

  //options for the line chart 
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
            delay: props.speed+1000,
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
            max: 50
          }
        }
      ]
    }
  };
  
  //When the slider changes get the new speed value from the slider 
  function onSliderChange(value){
    props.parseSpeed(value)
  }
    
  return (
    <div className='infofield'>
        <div className="barchart">
          <Line data={data} options={options}  />
        </div>

        <div className="slidecontainer">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            onChange={onSliderChange}
          />
        </div>
        
        <div className="info">
          <p className="head">Population Statistics</p>
          <hr />
          <div className="grid">
              <p></p>              <p className="bold centre rab"> Rabbits</p> <p className="bold centre fx">Foxes</p> <p className="bold centre plnt">Plants</p>
              <p>Starting Pop</p>  <p className="centre">{iniitialRabbits}</p> <p className="centre">{initialFoxes}</p><p className="centre">{initialPlants}</p>   
              <p>Current Pop</p>   <p className="centre">{rabbits.length}</p>  <p className="centre">{foxes.length}</p> <p className="centre">{plants.length}</p> 
              <p>Males</p>         <p className="centre">{rabbitMales}</p>     <p className="centre">{foxesMales}</p>   <p className="centre">null</p>       
              <p>Females</p>       <p className="centre">{rabbitFemales}</p>   <p className="centre">{foxesFemales}</p> <p className="centre">null</p>
          </div>  
        </div>
    </div>
  );
}

export default InfoField;
