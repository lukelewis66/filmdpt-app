const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  //setting port for our server
  //remember to add proxy to server 5000 in package.json
  //"proxy": "http://localhost:5000"
  port = process.env.PORT || 5000;
const cors = require("cors");
const mysql = require("mysql");
const config = require("./config");
const db = config.database;

const connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
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
  const SELECT_ALL_USERS_QRY = "SELECT * FROM TBL_USER";
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

//get all gear from tbl_gear
app.get("/api/gear", (req, res) => {
  const SELECT_ALL_GEAR_QRY = "SELECT * FROM tbl_gear";
  connection.query(SELECT_ALL_GEAR_QRY, (err, results) => {
    if (err) {
      console.log("gear qry error: ", err);
      return err;
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

//add gear to tbl_gear
app.get("api/gear/add", (req, res) => {
  const { gear_name, gear_level, gear_available } = req.query;
  const INSERT_GEAR_QRY = `INSERT INTO tbl_gear (gear_name, gear_level, gear_available VALUES('${gear_name}', ${gear_level}, ${gear_available})`;
  connection.query(INSERT_GEAR_QRY, (err, results) => {
    if (err) {
      console.log("add gear error: ", err);
      return err;
    } else {
      return res.send("successfully added item");
    }
  });
});

//query to add user
app.get("api/users/add", (req, res) => {
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
