import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";

const SignInModal = ({ signIn, signInClick }) => {
  const [formMessage, setFormMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    if (form.email === "" || form.password === "") {
      setFormMessage("All fields must be filled");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      };
      fetch("/loginUser", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.auth === true) {
            localStorage.setItem("JWT", data.token);
            window.location.reload();
          } else {
            setFormMessage(data.message);
          }
        })
        .catch((error) => {
          console.log(error.data);
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
    clearFields();
    signInClick(false);
  };

  const clearFields = () => {
    form.email = "";
    form.password = "";
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <Container>
      <Modal onHide={() => handleClose()} show={signIn}>
        <Modal.Header>Sign In</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Field>
              <Form.Input
                label="Email"
                placeholder="Email"
                field="email"
                value={form.name}
                onChange={(e, { field, value }) => handleChange(field, value)}
                onKeyPress={(e) => handleEnter(e)}
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
                onKeyPress={(e) => handleEnter(e)}
              />
            </Form.Field>
          </Form>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SignInModal;
