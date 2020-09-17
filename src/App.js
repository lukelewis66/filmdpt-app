import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container, Segment } from "semantic-ui-react";
import { Row, Col, Card } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Navbarr from "./components/navbar";
import Admin from "./components/admin";
import Home from "./components/home";
import News from "./components/news";
import Reserve from "./components/reserve";
import Background from "./components/background";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    users: [],
    bg: process.env.PUBLIC_URL + "/images/background-image.jpg",
    jwt: localStorage.getItem("JWT"),
  };

  render() {
    console.log("jwt: ", this.state.jwt);
    return (
      <div>
        <Background />
        <Navbarr jwt={this.state.jwt} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/news" component={News} />
          <Route path="/reserve" component={Reserve} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    );
  }
}

export default App;
