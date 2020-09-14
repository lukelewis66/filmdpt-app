import React, { useState, useEffect } from "react";
import { Menu, Container } from "semantic-ui-react";
import SignUpModal from "./modals/signUpModal";
import SignInModal from "./modals/signInModal";
import "../index.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Navbarr = () => {
  const [active, setActive] = useState(useLocation().pathname);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const doSomething = () => {
    console.log("TODO: Log Out feature");
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

  return (
    <div>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="/home">Film Dpt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="/home"
              name="home"
              active={active === "/"}
              onClick={() => setActive("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/news"
              name="news"
              active={active === "/news"}
              onClick={() => setActive("/news")}
            >
              News
            </Nav.Link>
            <Nav.Link
              href="/reserve"
              name="reserve"
              active={active === "/reserve"}
              onClick={() => setActive("/reserve")}
            >
              Reserve
            </Nav.Link>
            <Nav.Link
              href="/admin"
              name="admin"
              active={active === "/admin"}
              onClick={() => setActive("/admin")}
            >
              Admin
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setSignUp(true)}>Sign Up</Nav.Link>
            <Nav.Link onClick={() => setSignIn(true)}>Sign In</Nav.Link>
          </Nav>
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
