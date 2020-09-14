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
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    users: [],
  };

  render() {
    return (
      <Container fluid>
        <Navbarr />
        <Segment>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/news" component={News} />
            <Route path="/reserve" component={Reserve} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Segment>
      </Container>
    );
  }
}

export default App;
