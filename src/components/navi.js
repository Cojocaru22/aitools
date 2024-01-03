import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navi = () => {
  const activ = { fontWeight: "bold", color: "red" };
  const stilLink = {
    color: "black",
    textDecoration: "none",
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#e8e8e1" }}>
      <Container fluid>
        <Navbar.Brand
          className="px-5 "
          Text
          style={{ fontWeight: "bold" }}
          as={NavLink}
          to="/"
        >
          WebTOOLS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto px-5"
            style={isMobile ? { textAlign: "center" } : {}}
          >
            <Nav.Link
              as={NavLink}
              to="/"
              exact
              style={({ isActive }) => (isActive ? activ : stilLink)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/cards"
              style={({ isActive }) => (isActive ? activ : stilLink)}
            >
              Cards
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/chat"
              style={({ isActive }) => (isActive ? activ : stilLink)}
            >
              ChatBoot
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/addCards"
              style={({ isActive }) => (isActive ? activ : stilLink)}
            >
              Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
