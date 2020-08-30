import React, { Component } from "react";
import $ from "jquery";

class Navbar extends Component {
  state = {};

  changeActiveMenu = (menuItem) => {
    console.log("menu item clicked: ", menuItem);
    $(".item.active").removeClass("active");
    $("#" + menuItem).addClass("active");
  };
  render() {
    return (
      <div className="ui secondary pointing menu">
        <a
          id="Home"
          onClick={() => this.changeActiveMenu("Home")}
          className="item active"
        >
          Home
        </a>
        <a
          id="News"
          onClick={() => this.changeActiveMenu("News")}
          className="item"
        >
          News
        </a>
        <a
          id="Reservation"
          onClick={() => this.changeActiveMenu("Reservation")}
          className="item"
        >
          Make a Reservation
        </a>
        <a
          id="Admin"
          onClick={() => this.changeActiveMenu("Admin")}
          className="item"
        >
          Admin
        </a>
        <div className="right menu">
          <a className="ui item">Logout</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
