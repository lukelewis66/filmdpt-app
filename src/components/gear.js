import React, { Component } from "react";

class Gear extends Component {
  state = {};
  render() {
    return (
      <tr>
        <td data-label="Name">{this.props.gear.name}</td>
        <td data-label="Level">{this.props.gear.level}</td>
        <td data-label="Available">
          {this.props.gear.available ? "Yes" : "No"}
        </td>
        <td data-label="ReturnDate">{this.props.gear.returndate}</td>
        <td data-label="BorrowedBy">{this.props.gear.borrowingUserID}</td>
      </tr>
    );
  }
}

export default Gear;
