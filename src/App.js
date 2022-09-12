import React from "react";
import "../src/styles/style.css"
import MainField from "./components/MainField";
import BarChart from "./components/BarChart";

function App() {

  const speed = 100;

  return (
    <div className="app">
        <MainField speed={speed}/>  
        <BarChart speed={speed}/>
    </div>
  );
}

export default App;
