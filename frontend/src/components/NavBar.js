import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { login, logout } from "./../redux/gwestActions.js";

const NavBar = (props) => {
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Wild Wild Gwest</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer exact to="/battles">
              <Nav.Link>Battles</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/cards">
              <Nav.Link>Cards</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/record">
              <Nav.Link>Record</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {props.username === null ? (
              <Fragment>
                <LinkContainer exact to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer exact to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
              </Fragment>
            ) : (
              <Fragment>
                <LinkContainer exact to="/">
                  <Nav.Link onClick={props.logout}>Logout</Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
