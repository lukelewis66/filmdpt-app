import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Icon, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const SignInModal = ({ signIn, signInClick }) => {
  const [formMessage, setFormMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    //clear form fields here?
  });

  const handleSignIn = () => {
    if (form.email === "" || form.password === "") {
      console.log("email: ", form.email);
      console.log("pwd: ", form.password);
      setFormMessage("All fields must be filled");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      };
      fetch("/loginUser", requestOptions).then((response) => {
        console.log(response);
      });
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
    signInClick(false);
  };

  const handleOpen = () => {
    console.log("handle open called");
    clearFields();
    signInClick(true);
  };

  const clearFields = () => {
    form.email = "";
    form.password = "";
  };

  return (
    <Container>
      <Modal
        onClose={() => handleClose()}
        onOpen={() => handleOpen()}
        open={signIn}
      >
        <Modal.Header>Sign In</Modal.Header>
        <Modal.Content>
          <Form>
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
            onClick={() => handleSignIn()}
            positive
          />
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default SignInModal;
