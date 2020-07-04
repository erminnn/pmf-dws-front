import React from "react";
import { Link } from "react-router-dom";

import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavLink,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class DemoNavbar extends React.Component {
  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-light navbar-transparent"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <h3 style={{ color: "white", fontFamily: "Comic Sans MS" }}>
                  Immediately.com
                </h3>
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar-info">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-info">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <h3
                        style={{ color: "black", fontFamily: "Comic Sans MS" }}
                      >
                        Immediately.com
                      </h3>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar-info">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink to="/profile-page" tag={Link}>
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/login" tag={Link}>
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/register" tag={Link}>
                      Register
                    </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;

/*
<Container>
                <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("./logo.png")}
                  style={{ width: "150px", height: "65px" }}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar-info">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-info">
                <div className="navbar-collapse-header">
                 <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("./logo.png")}
                          style={{ width: "80px", height: "80px" }}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink to="/profile-page" tag={Link}>
                    Profile
                  </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink to="/login" tag={Link}>
                    Login
                  </NavLink>
                  </NavItem>
                  <NavItem>
                   <NavLink to="/register" tag={Link}>
                    Register
                  </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
*/
