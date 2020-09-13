//https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436
//what I referenced to get this working
const jwtSecret = require("./jwtConfig");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const BCRYPT_SALT_ROUNDS = 12;

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;

const Model = require("../sequelize");
const User = Model.User;

//NOTE: username is the email
passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            email: username,
          },
        }).then((user) => {
          if (user !== null) {
            console.log("an account with this email already exists");
            return done(null, false, {
              //info in passport.authenticate("register", (err, user, info) =>{}) will contain message
              message: "an account with this email already exists",
            });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
              User.create({ email: username, password: hashedPassword }).then(
                (user) => {
                  console.log("user created");
                  return done(null, user);
                }
              );
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            email: username,
          },
        }).then((user) => {
          if (user === null) {
            //info in passport.authenticate("login", (err, user, info) =>{}) will contain message
            return done(null, false, { message: "bad email" });
          } else {
            bcrypt.compare(password, user.password).then((response) => {
              if (response !== true) {
                console.log("incorrent password");
                //info in passport.authenticate("login", (err, user, info) =>{}) will contain message
                return done(null, false, { message: "incorrent password" });
              }
              console.log("user found & authenticated");
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          email: jwt_payload.id,
        },
      }).then((user) => {
        if (user) {
          console.log("user found in db in passport");
          done(null, user);
        } else {
          console.log("user not found in db");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
