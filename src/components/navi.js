import React, { useState, useEffect } from "react";
import { Nav, Navbar, Image, NavDropdown, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/authContext";
import "../App.css";

const Navi = () => {
  const { currentUser, loading } = useAuth();

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Verifică dacă datele sunt încă în proces de încărcare și, în acest caz, returnează un element de încărcare sau null
  if (loading) {
    return null; // sau un indicator de încărcare, dacă preferi
  }

  const handleLogout = () => {
    console.log("Logging out...");
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

  return (
    <Navbar fixed="top" expand="lg" data-bs-theme="light" className="navbar">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="./imagini/logo2.png"
            alt="logo"
            style={{ width: "100px", height: "70px" }} // Inline styles to maintain dimensions
            rounded
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              exact="true"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Home
            </NavLink>

            <NavLink
              to="/collection"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Categorii
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Chat
            </NavLink>
          </Nav>

          {currentUser ? (
            <>
              <Nav className="ms-auto">
                <NavDropdown
                  title={
                    <span
                      className={({ isActive }) =>
                        isActive ? "active" : "inactive"
                      }
                    >
                      Admin
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavLink to="/add-cards" className="dropdown-item">
                    Admin
                  </NavLink>
                  <NavLink to="/formular" className="dropdown-item">
                    Formular
                  </NavLink>
                </NavDropdown>
                <Nav.Link className="inactive" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Login
              </NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
