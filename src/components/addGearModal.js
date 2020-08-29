import React, { useState } from "react";
import { Container, Modal, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AddGearForm from "./addGearForm";

function AddGearModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("1");
  const [available, setAvailable] = useState("1");

  const handleChange = (name, value) => {
    //this.setState({ [name]: value });
    console.log("Name: ", name);
    console.log("Value: ", value);
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
          <AddGearForm
            name={name}
            level={level}
            avilable={available}
            onChange={() => handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Add Gear"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

export default AddGearModal;
