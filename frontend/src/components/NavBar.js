import React, { Fragment } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
export default class NavBar extends React.Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="home">Wild Wild Gwest</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="battles">Battles</Nav.Link>
              <Nav.Link href="cards">Cards</Nav.Link>
              <Nav.Link href="bosses">Bosses</Nav.Link>
              <Nav.Link href="record">Record</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}
