import React from "react";

class Signup extends React.Component {
  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.props.handleSignup}>
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
export default Signup;
