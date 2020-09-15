import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container, Segment } from "semantic-ui-react";
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
  };

  render() {
    const bg = process.env.PUBLIC_URL + "/images/background-image.jpg";
    console.log(bg);
    return (
      <div>
        <Background />
        <Navbarr />
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
