import React, { Component, useEffect } from "react";
import { Form, Radio, Popup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const AddGearForm = ({ form, handleChange, handleEnter }) => {
  const lvlOptions = [
    { value: 0, label: "None" },
    { value: 1, label: "Film 1" },
    { value: 2, label: "Film 2" },
    { value: 3, label: "Film 3" },
    { value: 4, label: "Film 4" },
  ];
  const availOptions = [
    { label: "Yes", value: "Available" },
    { label: "No", value: "Blocked" },
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
          onKeyPress={(e) => handleEnter(e)}
        />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Min. Class Requirement</label>
          {lvlOptions.map((option) => (
            <Form.Field>
              <Radio
                label={option.label}
                field="level"
                name="requirements"
                value={option.value}
                checked={form.level === option.value}
                onChange={(e, { field, value }) => handleChange(field, value)}
              />
            </Form.Field>
          ))}
        </Form.Field>
        <Form.Field>
          <label>Available to Borrow?</label>
          {availOptions.map((option) => (
            <Form.Field>
              <Radio
                label={option.label}
                field="status"
                name="available"
                value={option.value}
                checked={form.status === option.value}
                onChange={(e, { field, value }) => handleChange(field, value)}
              />
            </Form.Field>
          ))}
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

export default AddGearForm;
