import React, { Component } from "react";
import { Form, Select, Radio } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const AddGearForm = ({ form, handleChange, handleEnter }) => {
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
          onKeyPress={(e) => handleEnter(e)}
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
          onKeyPress={(e) => handleEnter(e)}
        />
        <Form.Field
          control={Select}
          label="Available to Borrow"
          field="status"
          value={form.status}
          options={availableOptions}
          onChange={(e, { field, value }) => handleChange(field, value)}
          onKeyPress={(e) => handleEnter(e)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <Form.Field>
            <Radio
              label="Film 1"
              name="requirements"
              field="level"
              value={1}
              checked={form.level === 1}
              onChange={(e, { field, value }) => handleChange(field, value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Film 2"
              name="requirements"
              field="level"
              value={2}
              checked={form.level === 2}
              onChange={(e, { field, value }) => handleChange(field, value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Film 3"
              name="requirements"
              field="level"
              value={3}
              checked={form.level === 3}
              onChange={(e, { field, value }) => handleChange(field, value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Film 4"
              name="requirements"
              field="level"
              value={4}
              checked={form.level === 4}
              onChange={(e, { field, value }) => handleChange(field, value)}
            />
          </Form.Field>
        </Form.Field>
        <Form.Field>
          <Form.Field>
            <Radio
              label="Yes"
              field="status"
              name="available"
              value="Available"
              checked={form.status === "Available"}
              onChange={(e, { field, value }) => handleChange(field, value)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="No"
              field="status"
              name="available"
              value="Blocked"
              checked={form.status === "Blocked"}
              onChange={(e, { field, value }) => handleChange(field, value)}
            />
          </Form.Field>
        </Form.Field>
      </Form.Group>
      {/* <Form.Row>
        <Form.Check inline label="Film 1" type="radio" id="film1" />
        <Form.Check inline label="Film 2" type="radio" id="film2" />
        <Form.Check inline label="Film 3" type="radio" id="film3" />
        <Form.Check inline label="Film 4" type="radio" id="film4" />
      </Form.Row> */}
    </Form>
  );
};

export default AddGearForm;
