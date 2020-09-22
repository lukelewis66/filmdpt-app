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
              <th>Status</th>
              <th>Return Date</th>
              <th>Reservation</th>
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
