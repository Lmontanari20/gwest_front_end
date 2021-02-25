import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Battles from "./components/Battles.js";
import Cards from "./components/Cards.js";
import Record from "./components/Record.js";
import history from "./history.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "./redux/gwestActions.js";

class App extends React.Component {
  //function that handles authorization response data from login and signup functions
  handleAuthResponse = (data) => {
    if (data.username) {
      const { username, id, token } = data;
      history.push("/cards");

      this.props.login(username, id);

      localStorage.setItem("token", token);
      debugger;
    } else if (data.error) {
      this.setState({
        error: data.error,
      });
    }
  };

  // function that handles the login functionality
  handleLogin = (e) => {
    e.preventDefault();
    debugger;
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => this.handleAuthResponse(data))
      .catch(console.log);
  };

  // function that handles the signup functionality
  handleSignup = (e, userInfo) => {
    e.preventDefault();

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.handleAuthResponse(data);
      })
      .catch(console.log);
  };

  render() {
    return (
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route
            path="/login"
            component={() => <Login handleLogin={this.handleLogin} />}
          ></Route>
          <Route
            path="/signup"
            component={() => <Signup handleSignup={this.handleSignup} />}
          ></Route>
          <Route path="/battles" component={Battles}></Route>
          <Route path="/cards" component={Cards}></Route>
          <Route path="/record" component={Record}></Route>
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  debugger;
  return {
    username: state.username,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, id) => dispatch(login(username, id)),
    logout: (username) => dispatch(logout(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
