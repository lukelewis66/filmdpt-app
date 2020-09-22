import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <tr>
        <td data-label="Name">{this.props.user.name}</td>
        <td data-label="Username">{this.props.user.user_name}</td>
        <td data-label="Password">{this.props.user.password}</td>
      </tr>
    );
  }
}

export default User;
