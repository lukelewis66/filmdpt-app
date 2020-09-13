import React, { useState, useEffect, useRef } from "react";
import { Container } from "semantic-ui-react";
import GearList from "./gearlist";
import AddGearModal from "./modals/addGearModal";

const Admin = () => {
  const [gearList, setGearList] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    let accessString = localStorage.getItem("JWT");
    console.log("accessString: ", accessString);
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `JWT ${accessString}` },
    };
    fetch("/findUser", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    getGearList();
  }, []);

  const reloadGearList = () => {
    getGearList();
  };

  const getGearList = async () => {
    fetch("/api/gear")
      .then((res) => res.json())
      .then((res) =>
        setGearList(
          res.data.map((gear) => ({
            id: gear.gear_id,
            name: gear.gear_name,
            level: gear.gear_level,
            available: gear.gear_available,
            returndate: gear.gear_returndate,
            borrowingUserID: gear.gear_borrowingUserID,
          }))
        )
      )
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <GearList gearlist={gearList}></GearList>
      <AddGearModal doGearAdd={reloadGearList}></AddGearModal>
    </Container>
  );
};

export default Admin;
