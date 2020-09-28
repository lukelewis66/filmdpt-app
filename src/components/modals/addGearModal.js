import React, { useState } from "react";
import { Button, Icon, Popup, Message } from "semantic-ui-react";
import { Modal, Container } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";
import AddGearForm from "../admin/addGearForm";

const AddGearModal = ({ doGearAdd, addGear, closeAddGearModal }) => {
  const [form, setForm] = useState({
    name: "",
    level: 1,
    status: "Available",
  });
  const [successPopup, setSuccessPopup] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  //this function is passed to the addGearForm child component along with the form state object defined above.
  //Whenever a change is detected in any of the input fields, the form object is updated to reflect the changes.
  const handleChange = (field, value) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setFormMessage("");
  };

  const addSuccess = () => {
    if (successPopup) {
      return (
        <Message
          success
          header="Item Added"
          content="Gear successfully added to database"
        />
      );
    }
  };

  const addError = () => {
    if (formMessage !== "") {
      return (
        <Message
          error
          header="Missing Field"
          content="Name field cannot be blank"
        />
      );
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
    fetch("/addItem", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("message: ", data.message);
        resetFields();
        doGearAdd();
        setSuccessPopup(true);
        setTimeout(() => {
          setSuccessPopup(false);
        }, 1500);
      });
  };

  const handleClose = () => {
    resetFields();
    closeAddGearModal();
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const resetFields = () => {
    for (const field in form) {
      form.name = "";
      form.level = 1;
      form.status = "Available";
    }
  };

  return (
    <Container>
      <Modal onHide={() => handleClose()} show={addGear}>
        <Modal.Header>Add New Gear</Modal.Header>
        <Modal.Body>
          <AddGearForm
            form={form}
            handleChange={handleChange}
            handleEnter={handleEnter}
            formMessage={formMessage}
          />
          {addSuccess()}
          {addError()}
        </Modal.Body>
        <Modal.Footer>
          <Button color="black" onClick={() => handleClose()}>
            Nope
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddGearModal;
