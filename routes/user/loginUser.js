const passport = require("passport");
const Model = require("../../sequelize");
const User = Model.User;
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  //CUSTOM CALLBACK - Callback will have access to req, res
  //for a custom callback to work, the application must establish a session (by calling req.logIn) and send a response
  //if authentication failed, user will be set to false
  //if an exception occured, err will be set
  app.post("/loginUser", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, (err) => {
          User.findOne({
            where: {
              email: req.body.email,
            },
          }).then((user) => {
            const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
            res.status(200).send({
              auth: true,
              token: token,
              message: "user found & logged in",
              //user: user,
            });
          });
        });
      }
    })(req, res, next); //<-- Necessary for custom callback. Gives callback access to req and res objects through closure.
  });
};
