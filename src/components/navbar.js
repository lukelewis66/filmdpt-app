import React, { useState, useEffect } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import SignUpModal from "./modals/signUpModal";
import SignInModal from "./modals/signInModal";

const Navbar = ({ activePage, doPageClick }) => {
  const [active, setActive] = useState(activePage);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handlePageClick = (name) => {
    setActive(name);
    doPageClick(name);
  };

  const doSomething = () => {
    console.log("something");
    setSignUp(true);
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
          name="home"
          active={active === "home"}
          onClick={(e, { name }) => handlePageClick(name)}
        />
        <Menu.Item
          name="news"
          active={active === "news"}
          onClick={(e, { name }) => handlePageClick(name)}
        />
        <Menu.Item
          name="reserve"
          active={active === "reserve"}
          onClick={(e, { name }) => handlePageClick(name)}
        />
        <Menu.Item
          name="admin"
          active={active === "admin"}
          onClick={(e, { name }) => handlePageClick(name)}
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
