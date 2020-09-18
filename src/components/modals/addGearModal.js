import React, { useState } from "react";
import { Container, Button, Icon } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";
import AddGearForm from "../addGearForm";

const AddGearModal = ({ doGearAdd, addGear, closeAddGearModal }) => {
  const [form, setForm] = useState({
    name: "",
    level: "1",
    available: "1",
  });
  const [formMessage, setFormMessage] = useState("");

  //this function is passed to the addGearForm child component along with the form state object defined above.
  //Whenever a change is detected in any of the input fields, the form object is updated to reflect the changes.
  const handleChange = (field, value) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (form.name === "") {
      setFormMessage("Name field cannot be blank");
      return;
    }
    console.log("form when we submit: ", form);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form }),
    };
    fetch("/api/gear/add", requestOptions)
      .then((response) => console.log("response: ", response))
      .then(() => doGearAdd());
  };

  const handleClose = () => {
    clearFields();
    closeAddGearModal();
  };

  const clearFields = () => {
    for (const field in form) {
      form[field] = "";
    }
  };

  return (
    <Container>
      <Modal onHide={() => handleClose()} show={addGear}>
        <Modal.Header>Add New Gear</Modal.Header>
        <Modal.Body>
          <AddGearForm form={form} handleChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <label id="form-message" style={{ color: "red" }}>
            {formMessage}
          </label>
          <Button color="black" onClick={() => handleClose()}>
            Nope
          </Button>
          <Button
            content="Add Gear"
            labelPosition="right"
            icon="checkmark"
            onClick={() => handleSubmit()}
            positive
          />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddGearModal;
