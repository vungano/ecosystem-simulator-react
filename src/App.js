import React from "react";
import "../src/styles/style.css"
import MainField from "./components/MainField";
import InfoField from "./components/InfoField";

function App() {

  const speed = 1000;

  return (
    <div className="app">
        <MainField speed={speed}/>  
        <InfoField speed={speed}/>
    </div>
  );
}

export default App;
