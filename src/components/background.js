import React, { useState, useEffect } from "react";
import "../index.css";
import bg from "../images/background-image.jpg";

const Background = ({ activepage }) => {
  const [active, setActive] = useState(activepage);

  useEffect(() => {
    setActive(activepage);
  });

  const getHeader = () => {
    switch (active) {
      case "/news":
        return "News";
      case "/reserve":
        return "Reserve";
      case "/admin":
        return "Admin";
      default:
        return "Home";
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
