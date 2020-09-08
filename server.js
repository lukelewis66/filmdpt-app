//TODO: UPDATE ALL QUERIES TO USE SEQUELIZE AND NEW TABLES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
const mysql = require("mysql");
const config = require("./dbconfig");
const passport = require("passport");
require("./config/passport");
require("./routes/loginUser")(app);
require("./routes/registerUser")(app);
require("./routes/findUsers")(app);
require("./routes/deleteUser")(app);
require("./routes/updateUser")(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const db = config.database;
const connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
});

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

//query to add user
app.get("/api/users/add", (req, res) => {
  const { name, username, password } = req.query;
  name = mysql_real_escape_string(name);
  username = mysql_real_escape_string(username);
  password = mysql_real_escape_string(password);
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

app.post("/api/gear/add", (req, res) => {
  const formBody = req.body.form;
  const gear_name = mysql_real_escape_string(formBody.name);
  const gear_level = mysql_real_escape_string(formBody.level);
  const gear_available = mysql_real_escape_string(formBody.available);
  const INSERT_GEAR_QRY = `INSERT INTO tbl_gear (gear_name, gear_level, gear_available) VALUES('${gear_name}', ${gear_level}, ${gear_available})`;
  connection.query(INSERT_GEAR_QRY, (err, results) => {
    if (err) {
      console.log("add gear error: ", err);
      return err;
    } else {
      return res.send("successfully added item");
    }
  });
});

//adds escape characters to special characters in sql string.
function mysql_real_escape_string(str) {
  if (typeof str != "string") return str;
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char; // prepends a backslash to backslash, percent,
      // and double/single quotes
      default:
        return char;
    }
  });
}
