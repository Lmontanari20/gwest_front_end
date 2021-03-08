import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home.js";
import NavBar from "./components/NavBar.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Battles from "./components/Battles.js";
import Cards from "./components/Cards.js";
import Record from "./components/Record.js";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "./redux/gwestActions.js";

const App = (props) => {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route
          path="/login"
          component={(props) => <Login {...props} />}
        ></Route>
        <Route
          path="/signup"
          component={(props) => <Signup {...props} />}
        ></Route>
        <Route path="/battles" component={Battles}></Route>
        <Route path="/cards" component={Cards}></Route>
        <Route path="/record" component={Record}></Route>
      </Switch>
    </Router>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state.username,
    userID: state.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, id) => dispatch(login(username, id)),
    logout: (username) => dispatch(logout(username)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
