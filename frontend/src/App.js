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
  state = {
    username: "",
    password: "",
    error: "",
  };

  //function that handles authorization response data from login and signup functions
  handleAuthResponse = (data) => {
    if (data.username) {
      const { username, id, token } = data;

      this.setState({
        username: {
          username,
          id,
        },
        error: null,
      });

      localStorage.setItem("token", token);
      // this.props.history.push("/paintings");
    } else if (data.error) {
      this.setState({
        error: data.error,
      });
    }
  };

  // function that handles the login functionality
  handleLogin = (e, userInfo) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(userInfo),
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
      body: JSON.stringify({ user: userInfo }),
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

export default App;
