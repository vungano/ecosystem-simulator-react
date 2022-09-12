import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

function Index(){
  return(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  )
}

ReactDOM.render(<Index/>,document.getElementById("root"))
