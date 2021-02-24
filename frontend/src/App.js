import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Login from "./components/Login.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
