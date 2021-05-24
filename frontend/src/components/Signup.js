import React from "react";
import { connect } from "react-redux";
import { login, logout } from "./../redux/gwestActions.js";

const Signup = (props) => {
  // function that handles the signup functionality
  const handleSignup = (e, userInfo) => {
    e.preventDefault();
    let user = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    fetch("https://wild-wild-gwest.herokuapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // if data.username else if data.error
        props.login(data.username, data.id);
        localStorage.setItem("token", data.token);
        props.history.push("/record");
      })
      .catch(console.log);
  };

  return (
    <div className="Signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>Username: </label>
        <input type="text" name="username" />
        <br />
        <br />
        <label>Password: </label>
        <input type="password" name="password" />
        <br />
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

export default connect(null, mapDispatchToProps)(Signup);
