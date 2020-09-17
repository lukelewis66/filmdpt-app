import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../index.css";
import bg from "../images/background-image.jpg";

const Background = () => {
  const [active, setActive] = useState(useLocation().pathname);
  console.log("re-rendered");

  const headerStyle = {};

  const getHeader = () => {
    console.log("here");
    switch (active) {
      case "/news":
        return "News";
        break;
      case "/reserve":
        return "Reserve";
        break;
      case "/admin":
        return "Admin";
        break;
      default:
        return "Home";
        break;
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url("${bg}")`,
        backgroundSize: "cover",
        height: "50vh",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <h5 className="bg-header">{getHeader()}</h5>
      {/* <Users users={users} /> */}
    </div>
  );
};

export default Background;
