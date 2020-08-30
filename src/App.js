import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container, Segment } from "semantic-ui-react";
import Navbar from "./components/navbar";
import Admin from "./components/admin";
import Home from "./components/home";
import News from "./components/news";
import Reserve from "./components/reserve";

class App extends Component {
  state = {
    users: [],
    gearlist: [],
    activePage: "home",
  };

  handlePageClick = (name) => {
    this.setState({ activePage: name });
  };

  render() {
    const { activePage } = this.state;
    console.log("activePage: ", activePage);
    let active;
    switch (activePage) {
      case "home":
        active = <Home />;
        break;
      case "news":
        active = <News />;
        break;
      case "reserve":
        active = <Reserve />;
        break;
      case "admin":
        active = <Admin />;
        break;
      default:
        break;
    }
    console.log("!!!");
    return (
      <Container>
        <Navbar activePage={activePage} doPageClick={this.handlePageClick} />
        <Segment>{active}</Segment>
      </Container>
    );
  }
}

export default App;
