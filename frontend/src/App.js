import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Battles from "./components/Battles.js";
import Cards from "./components/Cards.js";
import Record from "./components/Record.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/battles" component={Battles}></Route>
          <Route path="/cards" component={Cards}></Route>
          <Route path="/record" component={Record}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
