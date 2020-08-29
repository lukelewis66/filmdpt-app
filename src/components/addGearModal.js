import React, { Component } from "react";
import { Container, Modal, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AddGearForm from "./addGearForm";

function AddGearModal() {
  const [open, setOpen] = React.useState(false);
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
          <AddGearForm />
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
