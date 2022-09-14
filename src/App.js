import React, { useState } from "react";
import "../src/styles/style.css"
import MainField from "./components/MainField";
import InfoField from "./components/InfoField";


function App() {

  const [speed,setSpeed] = useState(1000)
 
  function getSpeed(speedValue){
    let tempSpeed = 1000 - speedValue*8
    setSpeed(tempSpeed) 
    
  }

  console.log(speed)

  return (
    <div className="app">
        <MainField speed={speed}/>  
        <InfoField speed={speed} parseSpeed={getSpeed}/>
    </div>
  );
}

export default App;
