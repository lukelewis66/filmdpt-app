import React, { Component } from "react";
import Gear from "./gear";

class GearList extends Component {
  render() {
    const { gearlist } = this.props.gearlist;
    return (
      <div>
        <table className="ui celled padded table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Available</th>
              <th>Return Date</th>
              <th>Borrowed By</th>
            </tr>
          </thead>
          <tbody>
            {this.props.gearlist.map((gear) => (
              <Gear key={gear.id} gear={gear}></Gear>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GearList;
