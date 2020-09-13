import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import SignUpModal from "./modals/signUpModal";
import SignInModal from "./modals/signInModal";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
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
      <Menu pointing>
        <Menu.Item
          as={Link}
          to={{
            pathname: "/",
            state: { message: "home" },
          }}
          name="home"
          active={active === "/"}
          onClick={() => setActive("/")}
        />
        <Menu.Item
          as={Link}
          to={{
            pathname: "/news",
            state: { message: "/news" },
          }}
          name="news"
          active={active === "/news"}
          onClick={() => setActive("/news")}
        />
        <Menu.Item
          as={Link}
          to={{
            pathname: "/reserve",
            state: { message: "reserve" },
          }}
          name="reserve"
          active={active === "/reserve"}
          onClick={() => setActive("/reserve")}
        />
        <Menu.Item
          as={Link}
          to={{
            pathname: "/admin",
            state: { message: "admin" },
          }}
          name="admin"
          active={active === "/admin"}
          onClick={() => setActive("/admin")}
        />
        <Menu.Menu position="right">
          <Menu.Item name="Sign Up" onClick={() => setSignUp(true)} />
          <Menu.Item name="Sign In" onClick={() => setSignIn(true)} />
          <Menu.Item name="Sign Out" onClick={doSomething} />
        </Menu.Menu>
      </Menu>
      <SignUpModal signUp={signUp} signUpClick={handleSignUpModal} />
      <SignInModal signIn={signIn} signInClick={handleSignInModal} />
    </div>
  );
};

export default Navbar;
