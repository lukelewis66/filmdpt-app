import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "semantic-ui-react";

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.express }))
      .catch((err) => console.log(err));
    console.log(this.state.data);
  }

  callBackendAPI = async () => {
    const response = await fetch("express_backend");
    const body = await response.json();

    if (response.states !== 200) {
      throw Error(body.message);
    }

    return body;
  };
  render() {
    return (
      <Container>
        <div className="App-Container">
          <table className="ui celled padded table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Name">Test Name</td>
                <td data-label="Username">Test User Name</td>
                <td data-label="Password">Test Password</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="App-intro">{this.state.data}</p>
      </Container>
    );
  }
}

export default App;
