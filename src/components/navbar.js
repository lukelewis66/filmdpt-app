import React, { useEffect, useState } from "react";
import { Menu, Container } from "semantic-ui-react";
import SignUpModal from "./modals/signUpModal";
import SignInModal from "./modals/signInModal";
import "../index.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCredentials from "../hooks/useCredentials";

const Navbarr = ({ changeActive }) => {
  const [activepage, setactivepage] = useState(
    window.location.pathname.toString()
  );
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const credentials = useCredentials();

  const setActive = (page) => {
    changeActive(page);
    setactivepage(page);
  };

  const handleSignUpModal = (open) => {
    //as of now open === true should not be happening, because the prop (set by sign up button) passed to modal is directly opening it.
    //though could be useful for later if we want some other trigger for opening it up.
    if (open === true) {
      setSignUp(true);
    } else {
      setSignUp(false);
    }
  };

  const handleSignInModal = (open) => {
    if (open === true) {
      setSignIn(true);
    } else {
      setSignIn(false);
    }
  };

  const signUserOut = () => {
    localStorage.removeItem("JWT");
    window.location.reload();
  };

  const checkAdmin = () => {
    if (credentials === "admin" || credentials === "supervisor") {
      console.log("??");
      return (
        <Nav.Link
          as={Link}
          to="/admin"
          name="admin"
          active={activepage === "/admin"}
          onClick={() => setActive("/admin")}
        >
          Admin
        </Nav.Link>
      );
    }
  };

  const checkJWT = () => {
    if (credentials !== null) {
      return (
        <Nav>
          <Nav.Link style={{ color: "darkorange" }}>My Profile</Nav.Link>
          <Nav.Link
            style={{ color: "darkorange" }}
            onClick={() => signUserOut()}
          >
            Sign Out
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link
            style={{ color: "darkorange" }}
            onClick={() => setSignUp(true)}
          >
            Sign Up
          </Nav.Link>
          <Nav.Link
            style={{ color: "darkorange" }}
            onClick={() => setSignIn(true)}
          >
            Sign In
          </Nav.Link>
        </Nav>
      );
    }
  };

  return (
    <div>
      <Navbar
        expand="md"
        variant="dark"
        fixed="top"
        style={{ background: "rgb(0, 0, 0, 0.5)" }}
      >
        <Navbar.Brand href="/home">Film Dpt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              to="/"
              name="home"
              active={activepage === "/"}
              onClick={() => setActive("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/news"
              name="news"
              active={activepage === "/news"}
              onClick={() => setActive("/news")}
            >
              News
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reserve"
              name="reserve"
              active={activepage === "/reserve"}
              onClick={() => setActive("/reserve")}
            >
              Reserve
            </Nav.Link>
            {checkAdmin()}
          </Nav>
          {checkJWT()}
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <SignUpModal signUp={signUp} signUpClick={handleSignUpModal} />
        <SignInModal signIn={signIn} signInClick={handleSignInModal} />
      </Container>
    </div>
  );
};

export default Navbarr;
