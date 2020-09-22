import React, { Component } from "react";
import { Form, Select } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const AddGearForm = ({ form, handleChange }) => {
  const levelOptions = [
    { key: "1", value: 1, text: "Film 1" },
    { key: "2", value: 2, text: "Film 2" },
    { key: "3", value: 3, text: "Film 3" },
    { key: "4", value: 4, text: "Film 4" },
  ];
  const availableOptions = [
    { key: "Available", value: "Available", text: "Yes" },
    { key: "Blocked", value: "Blocked", text: "No" },
  ];
  return (
    <Form>
      <Form.Field>
        <Form.Input
          label="Gear Name"
          placeholder="Name"
          field="name"
          value={form.name}
          onChange={(e, { field, value }) => handleChange(field, value)}
        />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field
          control={Select}
          label="Minimum Class Requirement"
          field="level"
          value={form.level}
          options={levelOptions}
          onChange={(e, { field, value }) => handleChange(field, value)}
        />
        <Form.Field
          control={Select}
          label="Available to Borrow"
          field="status"
          value={form.status}
          options={availableOptions}
          onChange={(e, { field, value }) => handleChange(field, value)}
        />
      </Form.Group>
    </Form>
  );
};

export default AddGearForm;
