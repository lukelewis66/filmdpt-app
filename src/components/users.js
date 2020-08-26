import React, { Component } from "react";
import User from "./user";

class Users extends Component {
  render() {
    const { users } = this.props.users;
    console.log("props users: ", this.props.users);
    return (
      <div>
        <table className="ui celled padded table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) => (
              <User key={user.id} user={user}></User>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
