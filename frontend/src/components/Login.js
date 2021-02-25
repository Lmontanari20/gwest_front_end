import React from "react";

export default class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <form onSubmit={(e) => this.props.handleLogin(e)}>
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
  }
}
