import React, { useState } from "react";
import { Container, Modal, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AddGearForm from "./addGearForm";

function AddGearModal() {
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
    //TODO: find a way to replace this switch to dynamically change the appropriate field in the form object based off field value above
    switch (field) {
      case "name":
        setForm({
          name: value,
          level: form.level,
          available: form.available,
        });
        break;
      case "level":
        setForm({
          name: form.name,
          level: value,
          available: form.available,
        });
        break;
      case "available":
        setForm({
          name: form.name,
          level: form.level,
          available: value,
        });
        break;
      default:
        break;
    }
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
    fetch("/api/gear/add", requestOptions);
  };

  return (
    <Container>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button icon>
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
}

export default AddGearModal;
