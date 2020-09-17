import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Gear from "./gear";

class GearList extends Component {
  render() {
    const { gearlist } = this.props.gearlist;
    return (
      <div>
        <Table striped bordered hover>
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
        </Table>
      </div>
    );
  }
}

export default GearList;
