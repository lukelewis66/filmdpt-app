import React, { useState } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";

const Navbar = ({ activePage, doPageClick }) => {
  console.log("activePage on render: ", activePage);
  const [active, setActive] = useState(activePage);
  console.log("active: ", active);

  const handlePageClick = (name) => {
    setActive(name);
    doPageClick(name);
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
      </Menu>
    </div>
  );
};

export default Navbar;
