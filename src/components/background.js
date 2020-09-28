import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "../index.css";
import bg from "../images/background-image.jpg";
import bg2 from "../images/background-2.jpg";
import bg3 from "../images/background-3.jpg";

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
    <div style={{ height: "50vh" }}>
      <Carousel>
        <Carousel.Item>
          <div
            style={{
              backgroundImage: `url("${bg}")`,
              backgroundSize: "cover",
              height: "50vh",
              backgroundPosition: "center",
              position: "relative",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              backgroundImage: `url("${bg2}")`,
              backgroundSize: "cover",
              height: "50vh",
              backgroundPosition: "center",
              position: "relative",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              backgroundImage: `url("${bg3}")`,
              backgroundSize: "cover",
              height: "50vh",
              backgroundPosition: "center",
              position: "relative",
            }}
          />
        </Carousel.Item>
      </Carousel>
      <h5 className="bg-header">{getHeader()}</h5>
    </div>
  );
};

export default Background;
