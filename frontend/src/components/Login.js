import React from "react";
import { connect } from "react-redux";
import "./../index.css";
import { login, logout } from "./../redux/gwestActions.js";
const Login = (props) => {
  // function that handles the login functionality
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://wild-wild-gwest.herokuapp.com/login", {
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
        props.login(data.username, data.id);
        localStorage.setItem("token", data.token);
        props.history.push("/record");
      })
      .catch(console.log);
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username: </label>
        <input type="text" name="username" />
        <br />
        <br></br>
        <label>Password: </label>
        <input type="password" name="password" />
        <br />
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, id) => dispatch(login(username, id)),
    logout: (username) => dispatch(logout(username)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
