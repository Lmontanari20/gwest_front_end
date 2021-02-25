import React, { Fragment } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
export default class NavBar extends React.Component {
  render() {
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
              <LinkContainer exact to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}
