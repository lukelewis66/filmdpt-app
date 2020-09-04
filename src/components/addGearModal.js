import React, { useState } from "react";
import { Container, Modal, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AddGearForm from "./addGearForm";

const AddGearModal = ({ doGearAdd }) => {
  const [open, setOpen] = useState(false);
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
  //test contribution2

  return (
    <Container>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button style={{ float: "right" }} icon>
            <Icon name="plus" />
          </Button>
        }
      >
        <Modal.Header>Add New Gear</Modal.Header>
        <Modal.Content>
          <AddGearForm form={form} handleChange={handleChange} />
        </Modal.Content>
        <Modal.Actions>
          <label id="form-message" style={{ color: "red" }}>
            {formMessage}
          </label>
          <Button color="black" onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Add Gear"
            labelPosition="right"
            icon="checkmark"
            onClick={() => handleSubmit()}
            positive
          />
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default AddGearModal;
