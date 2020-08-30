import React, { useState, useEffect, useRef } from "react";
import { Container } from "semantic-ui-react";
import GearList from "./gearlist";
import AddGearModal from "./addGearModal";

const Admin = () => {
  const [gearList, setGearList] = useState([]);
  var isMounted = false;

  useEffect(() => {
    isMounted = true;
    if (isMounted) {
      getGearList();
    }
    return () => {
      isMounted = false;
    };
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
