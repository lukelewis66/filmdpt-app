import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
//import User from "./components/user";
import Users from "./components/users";

class App extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          users: res.data.map((user) => ({
            id: user.user_id,
            name: user.user_name,
            user_name: user.user_username,
            password: user.user_password,
          })),
        })
      )
      .catch((err) => console.log(err));
  };

  changeActiveMenu = (menuItem) => {
    console.log("blah");
  };

  render() {
    return (
      <Container>
        <div class="ui secondary pointing menu">
          <a id="Home" class="item active">
            Home
          </a>
          <a id="News" class="item">
            News
          </a>
          <a id="Reservation" class="item">
            Make a Reservation
          </a>
          <div class="right menu">
            <a class="ui item">Logout</a>
          </div>
        </div>
        <div className="App-Container">
          <Users users={this.state.users}></Users>
        </div>
      </Container>
    );
  }
}

export default App;
