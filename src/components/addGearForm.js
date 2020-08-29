import React, { Component } from "react";
import { Form, Select } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class AddGearForm extends Component {
  state = {
    name: "",
    level: "1",
    available: "1",
  };

  handleSubmit = () => {};

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log("State changed: ", name, value);
  };

  render() {
    const { name, level, available } = this.state;
    const levelOptions = [
      { key: "1", value: "1", text: "Film 1" },
      { key: "2", value: "2", text: "Film 2" },
      { key: "3", value: "3", text: "Film 3" },
      { key: "4", value: "4", text: "Film 4" },
    ];
    const availableOptions = [
      { key: "1", value: "1", text: "Yes" },
      { key: "0", value: "0", text: "No" },
    ];
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Form.Input
            label="Gear Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field
            control={Select}
            name="level"
            value={level}
            options={levelOptions}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Select}
            name="available"
            value={available}
            options={availableOptions}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default AddGearForm;
