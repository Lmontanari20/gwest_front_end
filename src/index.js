import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { gwestReducer } from "./redux/gwestReducer.js";
import { Provider } from "react-redux";

const store = createStore(
  gwestReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App
        style={{
          backgroundImage:
            "url(" +
            "https://www.fodors.com/wp-content/uploads/2020/01/11_WildWestTowns__HERO_shutterstock_267103796.jpg" +
            ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
