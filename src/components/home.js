import React, { useState, useEffect } from "react";
import Users from "./users";
import bg from "../images/background-image.jpg";

const Home = () => {
  const [users, setUsers] = useState([]);

  //the second parameter ([]) is needed, else useEffect will infinitely be called
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((res) =>
        setUsers(
          res.data.map((user) => ({
            id: user.user_id,
            name: user.user_name,
            user_name: user.user_username,
            password: user.user_password,
          }))
        )
      )
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <p>iii</p>
      {/* <Users users={users} /> */}
    </div>
  );
};

export default Home;
