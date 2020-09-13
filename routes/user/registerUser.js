const passport = require("passport");
const Model = require("../../sequelize");
const User = Model.User;

module.exports = (app) => {
  app.post("/registerUser", (req, res, next) => {
    //CUSTOM CALLBACK - Callback will have access to req, res
    //for a custom callback to work, the application must establish a session (by calling req.logIn) and send a response
    //if authentication failed, user will be set to false
    //if an exception occured, err will be set
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, (err) => {
          const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.email,
          };
          User.findOne({
            where: {
              email: data.username,
            },
          }).then((user) => {
            user
              .update({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
              })
              .then(() => {
                console.log("user created in db");
                res.status(200).send({ message: "user created" });
              });
          });
        });
      }
    })(req, res, next); //<-- Necessary for custom callback. Gives callback access to req and res objects through closure.
  });
};
