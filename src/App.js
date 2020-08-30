import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container, Segment } from "semantic-ui-react";
import Users from "./components/users";
import GearList from "./components/gearlist";
import Navbar2 from "./components/navbar2";
import AddGearModal from "./components/addGearModal";

class App extends Component {
  state = {
    users: [],
    gearlist: [],
    activePage: "home",
  };

  componentDidMount() {
    this.getUserList();
    this.getGearList();
  }

  //called after any sort of add/remove/edit to gear list
  reloadGearList = () => {
    this.getGearList();
  };

  getUserList = () => {
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

  getGearList = () => {
    fetch("/api/gear")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          gearlist: res.data.map((gear) => ({
            id: gear.gear_id,
            name: gear.gear_name,
            level: gear.gear_level,
            available: gear.gear_available,
            returndate: gear.gear_returndate,
            borrowingUserID: gear.gear_borrowingUserID,
          })),
        })
      )
      .catch((err) => console.log(err));
  };

  handlePageClick = (name) => {
    this.setState({ activePage: name });
    console.log("active page state: ", this.state.activePage);
  };

  render() {
    const { activePage } = this.state.activePage;
    return (
      <Container>
        <Navbar2
          activePage={this.state.activePage}
          doPageClick={this.handlePageClick}
        />
        <Segment>
          <div className="App-Container">
            <Users users={this.state.users}></Users>
          </div>
          <div style={{ paddingTop: 15 }} className="App-Container">
            <GearList gearlist={this.state.gearlist}></GearList>
          </div>
          <AddGearModal doGearAdd={this.reloadGearList}></AddGearModal>
        </Segment>
      </Container>
    );
  }
}

export default App;
