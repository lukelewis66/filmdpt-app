import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbarr from "./components/navbar";
import Admin from "./components/admin/admin";
import Home from "./components/home/home";
import News from "./components/news/news";
import Reserve from "./components/reserve/reserve";
import Background from "./components/background";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    users: [],
    bg: process.env.PUBLIC_URL + "/images/background-image.jpg",
    jwt: localStorage.getItem("JWT"),
    activepage: window.location.pathname.toString(),
  };

  changeActive = (page) => {
    this.setState({ activepage: page });
  };

  render() {
    return (
      <div>
        <Background activepage={this.state.activepage} />
        <Navbarr changeActive={this.changeActive} />
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
