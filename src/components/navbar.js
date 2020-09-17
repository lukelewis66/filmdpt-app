import React, { useState, useEffect } from "react";
import { Menu, Container } from "semantic-ui-react";
import SignUpModal from "./modals/signUpModal";
import SignInModal from "./modals/signInModal";
import "../index.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation, Redirect } from "react-router-dom";

const Navbarr = () => {
  const [active, setActive] = useState(useLocation().pathname);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [jwt, setJwt] = useState(localStorage.getItem("JWT"));

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

  const signUserOut = () => {
    localStorage.removeItem("JWT");
    window.location.reload();
  };

  const checkJWT = () => {
    if (jwt !== null) {
      console.log("we got jwt in nav: ", jwt);
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `JWT ${jwt}` },
      };
      fetch("/findUser", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
      return (
        <Nav>
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
              active={active === "/"}
              onClick={() => setActive("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/news"
              name="news"
              active={active === "/news"}
              onClick={() => setActive("/news")}
            >
              News
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reserve"
              name="reserve"
              active={active === "/reserve"}
              onClick={() => setActive("/reserve")}
            >
              Reserve
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin"
              name="admin"
              active={active === "/admin"}
              onClick={() => setActive("/admin")}
            >
              Admin
            </Nav.Link>
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
