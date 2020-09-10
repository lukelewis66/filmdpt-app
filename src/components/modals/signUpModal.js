import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Icon, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const SignUpModal = ({ signUp, signUpClick }) => {
  const [formMessage, setFormMessage] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {});

  const handleClick = () => {
    if (
      form.first_name === "" ||
      form.last_name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.confirm_password === ""
    ) {
      setFormMessage("All fields must be filled");
    } else if (form.password != form.confirm_password) {
      setFormMessage("Passwords do not match");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      };
      console.log("form body email: ", requestOptions);
      fetch("/registerUser", requestOptions).then((response) =>
        console.log("response: ", response)
      );
    }
  };

  const handleChange = (field, value) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleClose = () => {
    console.log("handle close called");
    clearFields();
    signUpClick(false);
  };

  const handleOpen = () => {
    console.log("handle open called");
    clearFields();
    signUpClick(true);
  };

  const clearFields = () => {
    form.first_name = "";
    form.last_name = "";
    form.email = "";
    form.password = "";
    form.confirm_password = "";
  };

  return (
    <Container>
      <Modal
        onClose={() => handleClose()}
        onOpen={() => handleOpen()}
        open={signUp}
      >
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="First Name"
                  placeholder="First Name"
                  field="first_name"
                  value={form.first_name}
                  onChange={(e, { field, value }) => handleChange(field, value)}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Last Name"
                  placeholder="Last Name"
                  field="last_name"
                  value={form.last_name}
                  onChange={(e, { field, value }) => handleChange(field, value)}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <Form.Input
                label="Email"
                placeholder="Email"
                field="email"
                value={form.name}
                onChange={(e, { field, value }) => handleChange(field, value)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Password"
                type="password"
                placeholder="Password"
                field="password"
                value={form.password}
                onChange={(e, { field, value }) => handleChange(field, value)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                field="confirm_password"
                value={form.confirm_password}
                onChange={(e, { field, value }) => handleChange(field, value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <label id="form-message" style={{ color: "red" }}>
            {formMessage}
          </label>
          <Button color="black" onClick={() => handleClose()}>
            Nope
          </Button>
          <Button
            content="Sign Up"
            labelPosition="right"
            icon="checkmark"
            onClick={() => handleClick()}
            positive
          />
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default SignUpModal;
