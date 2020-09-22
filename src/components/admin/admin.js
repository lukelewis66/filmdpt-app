import React, { useState, useEffect, useRef } from "react";
import { Container } from "semantic-ui-react";
import { Button } from "react-bootstrap";
import GearList from "./gearlist";
import AddGearModal from "../modals/addGearModal";
import useCredentials from "../../hooks/useCredentials";

const Admin = () => {
  const [gearList, setGearList] = useState([]);
  const [message, setMessage] = useState();
  const [addGear, setAddGear] = useState(false);
  const credentials = useCredentials();

  useEffect(() => {
    getGearList();
  }, []);

  const closeAddGearModal = () => {
    setAddGear(false);
  };

  const checkCredentials = () => {
    if (credentials === "admin" || credentials === "supervisor") {
      return (
        <Container style={{ paddingTop: "15px" }}>
          <GearList gearlist={gearList}></GearList>
          <AddGearModal
            doGearAdd={reloadGearList}
            addGear={addGear}
            closeAddGearModal={closeAddGearModal}
          ></AddGearModal>
          <Button variant="primary" onClick={() => setAddGear(true)}>
            Add Gear
          </Button>
        </Container>
      );
    } else {
      return <p>Oops! You don't have the permission to access this page</p>;
    }
  };

  const reloadGearList = () => {
    getGearList();
  };

  const getGearList = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/getItems", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data: ", data.items);
        setGearList(
          data.items.map((item) => ({
            id: item.id,
            name: item.name,
            level: item.level,
            status: item.status,
            returndate: item.return_date,
            reservationId: item.reservationId,
          }))
        );
      })
      // }).then(())
      //   setGearList(
      //     res.data.map((gear) => ({
      //       id: gear.gear_id,
      //       name: gear.gear_name,
      //       level: gear.gear_level,
      //       available: gear.gear_available,
      //       returndate: gear.gear_returndate,
      //       borrowingUserID: gear.gear_borrowingUserID,
      //     }))
      //   )
      // )
      .catch((err) => console.log(err));
  };
  return <div>{checkCredentials()}</div>;
};

export default Admin;
