import React, { useState, useEffect } from "react";
import Users from "./users";

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
  return <Users users={users} />;
};

export default Home;
