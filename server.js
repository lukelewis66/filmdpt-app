const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  //setting port for our server
  //remember to add proxy to server 5000 in package.json
  //"proxy": "http://localhost:5000"
  //UPDATE: Line above does not work, must use
  //
  //   "proxy": {
  //     "secure": true,
  //     "target": {
  //       "host": "https://localhost",
  //       "port": 5000
  //     }
  //
  port = process.env.PORT || 5000;
const cors = require("cors");
const mysql = require("mysql");

const SELECT_ALL_USERS_QRY = "SELECT * FROM TBL_USER";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "reservation_app",
});

app.use(cors());
app.use(express.json());
connection.connect((err) => {
  if (err) {
    console.log("connection error: ", err);
    return err;
  }
});

app.listen(port, () => console.log("listening on port ", port));

app.get("/api/users", (req, res) => {
  console.log("user endpoint called");
  connection.query(SELECT_ALL_USERS_QRY, (err, results) => {
    if (err) {
      console.log("error: ", err);
      return err;
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

//query to add user
app.get("/users/add", (req, res) => {
  const { name, username, password } = req.query;
  const INSERT_USER_QRY = `INSERT INTO tbl_user (user_name, user_username, user_password) VALUES('${name}', '${username}', '${password}')`;
  connection.query(INSERT_USER_QRY, (err, results) => {
    if (err) {
      console.log("insert error: ", err);
      return err;
    } else {
      return res.send("successfully added user");
    }
  });
});

//setting up a GET route which will be fetched by react app
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
