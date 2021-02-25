import React from "react";
import { connect } from "react-redux";
import { login, logout } from "./../redux/gwestActions.js";
const Login = (props) => {
  // function that handles the login functionality
  const handleLogin = (e) => {
    e.preventDefault();
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
      .then((data) => {
        props.login(data.username, data.id);
        localStorage.setItem("token", data.token);
        props.history.push("/record");
      })
      .catch(console.log);
  };

  return (
    <div className="Login">
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input type="text" name="username" />
        <br />
        <label>Password</label>
        <input type="password" name="password" />
        <br />
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
