const passport = require("passport");
const Model = require("../../sequelize");
const User = Model.User;
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

module.exports = (app) => {
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
            console.log("found user...");
            const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
            res.status(200).send({
              auth: true,
              token: token,
              message: "user found & logged in",
              user: user,
            });
          });
        });
      }
    })(req, res, next);
  });
};
